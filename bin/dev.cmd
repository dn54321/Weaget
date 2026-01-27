@echo off

node --import @swc-node/register/esm-register "%~dp0\dev" %*
