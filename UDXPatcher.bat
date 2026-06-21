@Echo Off

CD %~dp0

Deno run -A mod.ts ./source/exefs/main NULL NULL NULL NULL NULL NULL

Pause
Exit /b