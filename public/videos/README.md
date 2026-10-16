# AetherMind ambient hero film

Generated locally on 2026-10-13 using the installed ComfyUI MiniMax H3 workflow, adapted from the user's Work-Fisher H3 integrated workflow. No hosted inference service was used.

- Source image: `output/imagegen/hero-lattice.png`, the original project-generated illustration documented under `public/images/immersive/README.md`.
- API graph: `h3-hero-workflow.json`. First and last image inputs both use the source artwork.
- Models: `minimax_h3_fl2va_int8_convrot.safetensors`, `qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors`, `minimax_h3_video_vae_fp16.safetensors`.
- 1664 × 928, 124 frames at 24 fps, Euler / beta, 10 steps, seed 2026101377 (re-generated with locked-camera, less than 1% vertical breathing prompt). Tiled VAE decoding (512-pixel tiles). No audio decoded or published.
- The generated endpoints still differed, so the film is played forward and backward in one encoded sequence, excluding duplicate endpoint frames. Website MP4 `aethermind-h3-subtle-hd.mp4`: approximately 10.2 seconds, 4.6 MB, H.264 / yuv420p, faststart; generation metadata removed.
- Runtime: one muted inline loop, user pause/play, offscreen and hidden-tab pause, no video download for reduced motion / Save-Data / 2G. Original responsive WebP remains the poster and error fallback. Existing interactive 3D remains a single canvas.

This is artistic scientific imagery, not measured simulation output or a validated molecular structure.
