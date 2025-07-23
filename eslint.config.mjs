import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { defineConfig, globalIgnores } from "eslint/config";

import globals from "globals";

import { fixupConfigRules } from "@eslint/compat";

import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";

import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([
    ...compat.extends("eslint:recommended"),
    {
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },

            globals: {
                ...globals.browser,
                ...globals.commonjs,
            },
        },
    },
    globalIgnores(["!**/.server", "!**/.client", "build/", ".react-router/", ".wrangler/", "@types/", "node_modules/", "public/"]),
    ...fixupConfigRules(compat.extends(
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
    )).map((config) => ({
        ...config,
        files: ["**/*.{js,jsx,ts,tsx}"],
        settings: {
            ...config.settings,
            react: {
                version: "detect",
            },

            formComponents: ["Form"],

            linkComponents: [{
                name: "Link",
                linkAttribute: "to",
            }, {
                name: "NavLink",
                linkAttribute: "to",
            }],

            "import/resolver": {
                typescript: {},
            },
        },
    })), ...fixupConfigRules(compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
    )).map((config) => ({
        ...config,
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ...config.languageOptions,
            parser: tsParser,
        },
        settings: {
            ...config.settings,
            "import/internal-regex": "^~/",
            "import/resolver": {
                node: {
                    extensions: [".ts", ".tsx"],
                },
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
        rules: {
            ...config.rules,
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
                }
            ]
        }
    })), {
    files: ["**/.eslintrc.cjs"],

    languageOptions: {
        globals: {
            ...globals.node,
        },
    },
}]);
