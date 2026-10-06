"""Conditional Transformer arithmetic, never an estimator of a person's parameters."""
import argparse
import json

def architecture(vocab, width, layers, query_heads, kv_heads, context_tokens, bytes_per_value=2):
    values = [vocab, width, layers, query_heads, kv_heads, context_tokens, bytes_per_value]
    if any(type(v) is not int or v <= 0 for v in values):
        raise ValueError('Architecture assumptions must be positive integers')
    if width % query_heads or query_heads % kv_heads or kv_heads > query_heads:
        raise ValueError('Head configuration must divide width and query heads')
    head_dim = width // query_heads
    kv_width = kv_heads * head_dim
    # Tied embedding, Q/O full width, K/V grouped, vanilla 4d two-projection FFN.
    parameters = vocab * width + layers * (10 * width * width + 2 * width * kv_width)
    kv_bytes = 2 * layers * kv_width * context_tokens * bytes_per_value
    return {'parameters':parameters, 'kvBytes':kv_bytes, 'kvMiB':round(kv_bytes / 2**20, 4),
        'assumptions':{'V':vocab,'d':width,'L':layers,'queryHeads':query_heads,'kvHeads':kv_heads,'C':context_tokens,'bytesPerValue':bytes_per_value},
        'kind':'conditional_calculation_not_person_estimate',
        'architecture':'tied_embedding_vanilla_4d_ffn_gqa_bias_norm_omitted_batch1'}

def report_scenarios(plan_id):
    # Reference-inspired toy sizes. Context is an assumed setting, not inferred from quotes.
    cases = [(4096,24,4,4,2,3176), (4096,64,8,8,4,3176), (4096,128,16,16,4,3176)]
    results = [architecture(*case) for case in (cases if plan_id == 'deep' else cases[:1])]
    if plan_id == 'deep':
        for result, case in zip(results, cases):
            vocab, width, layers, query_heads, kv_heads, context = case
            doubled = architecture(vocab, width, layers, query_heads, kv_heads, context * 2)
            mha = architecture(vocab, width, layers, query_heads, query_heads, context)
            result['sensitivity'] = {
                'doubleContext': {'C': context * 2, 'parameters': doubled['parameters'], 'kvBytes': doubled['kvBytes']},
                'allHeadsKV': {'kvHeads': query_heads, 'parameters': mha['parameters'], 'kvBytes': mha['kvBytes']},
            }
    return results

if __name__ == '__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    for name in ('vocab','width','layers','query-heads','kv-heads','context-tokens'):
        parser.add_argument('--'+name,type=int,required=True)
    parser.add_argument('--bytes-per-value',type=int,default=2)
    args=parser.parse_args()
    print(json.dumps(architecture(**vars(args)),ensure_ascii=False,indent=2))
