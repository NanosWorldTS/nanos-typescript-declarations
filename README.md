# TypeScript Declarations for nanos world ![npm](https://img.shields.io/npm/v/nanos-world-types)
TypeScript Declarations for the nanos world API which can be used with [TypeScriptToLua](https://github.com/TypeScriptToLua/TypeScriptToLua).

## Installation
Either by clicking the **npm** badge above

***or***

run the following command
````bash
npm i -D nanos-world-types
````

## Usage / How to use
In order to use the declarations you need to tell TypeScript that you want to use them. In order to that you have two options:

### Option 1:
Reference the declaration in your TypeScript files. Therefore you just need to paste the following line in every TypeScript file where you need the declarations:
````typescript
/// <reference types="nanos-world-types" />
````

### Option 2:
Reference the declaration in your tsconfig.json. Just add the following snippet to the **compilerOptions** object of your `tsconfig.json`:
````json
"types": [
    "nanos-world-types"
]
````

## Versioning
The version number for the declarations are built by the following schema:
- The first number is the documentations number of nanos world but without the dots
- The second number is the alpha/beta/etc. declaration. The numerical position in the alphabet of the first letter of the phase is taken
- The last number is the version number of the declaration. If a change is made to the declaration, but not the documentation, this number gets incremented
