@Echo Off

CD %~dp0

Deno compile -A mod.ts

Pause
Exit /b