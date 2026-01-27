#!/usr/bin/env -S node --import @swc-node/register/esm-register

import {execute} from "@oclif/core";

await execute({development: true, dir: import.meta.url});
