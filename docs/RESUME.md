# Current checkpoint

NautiKid master: this repository, game-v2/index.html. Five workstreams: architecture (Explore), library selection (Gamekit), gameplay/host UI (Mavis), rendering (Picker), verification (Verification). These are task helpers, not persistent system services.

Current delivery focuses on real 3D movement, fitted camera and classroom anchors, accessible host controls, Phase B progression, clean replay, local runtime dependencies and verification. See README for launch and docs/VERIFICATION.md for measured test results. Asset gaps are in docs/ASSET-AUDIT.md; do not claim final child-character art or all special props are complete.

Resume by checking git status and running node tools/verify-game.cjs. Browser-test loading, both phases and replay before publishing further changes. No automatic token-quota reset/resumption is implemented.
