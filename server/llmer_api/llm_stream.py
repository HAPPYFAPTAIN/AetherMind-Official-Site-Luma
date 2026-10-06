"""Bounded SSE parser; visible and reasoning text both consume local output guard."""
import json
import time
from .llm_guard import repetition

def read_completion(response, output_limit, started, deadline, capture_usage, max_output_bytes=None, max_wire_bytes=512000):
    byte_limit=output_limit if max_output_bytes is None else max_output_bytes
    content=[];guard_tail='';output_bytes=0;wire_bytes=0;finish=None;buffer=b'';done=False
    def event(raw):
        nonlocal guard_tail,output_bytes,finish,done
        if raw.strip()==b'[DONE]': done=True;return
        try: obj=json.loads(raw)
        except (ValueError,UnicodeError): raise ValueError('LLM_BAD_JSON')
        if not isinstance(obj,dict): raise ValueError('LLM_BAD_JSON')
        if isinstance(obj.get('usage'),dict): capture_usage(obj['usage'])
        choices=obj.get('choices') or []
        if not choices: return
        choice=choices[0];delta=choice.get('delta',choice.get('message',{}))
        for field in ('content','reasoning_content','reasoning'):
            value=delta.get(field)
            if value is None: continue
            if not isinstance(value,str): raise ValueError('LLM_BAD_JSON')
            output_bytes+=len(value.encode('utf-8'))
            # Byte-based conservative proxy, not a claim to know provider tokenization.
            if output_bytes>byte_limit: raise ValueError('LLM_OUTPUT_LIMIT')
            guard_tail=(guard_tail+value)[-8192:]
            if repetition(guard_tail): raise ValueError('LLM_REPETITION')
            if field=='content': content.append(value)
        if choice.get('finish_reason') is not None: finish=choice['finish_reason']

    sse='text/event-stream' in response.headers.get('content-type','')
    for chunk in response.iter_bytes():
        if time.monotonic()-started>deadline: raise ValueError('LLM_DEADLINE')
        wire_bytes+=len(chunk)
        if wire_bytes>max_wire_bytes: raise ValueError('LLM_RESPONSE_TOO_LARGE')
        buffer+=chunk
        if not sse: continue
        while b'\n' in buffer:
            line,buffer=buffer.split(b'\n',1);line=line.rstrip(b'\r')
            if line.startswith(b'data:'): event(line[5:].strip())
            if done: break
        if done: break
    if not sse: event(buffer)
    elif buffer.strip().startswith(b'data:') and not done: event(buffer.strip()[5:].strip())
    if time.monotonic()-started>deadline: raise ValueError('LLM_DEADLINE')
    if finish!='stop': raise ValueError('LLM_INCOMPLETE_OUTPUT')
    text=''.join(content)
    if not text.strip(): raise ValueError('LLM_EMPTY_OUTPUT')
    try: return json.loads(text)
    except (ValueError,UnicodeError): raise ValueError('LLM_BAD_JSON')
