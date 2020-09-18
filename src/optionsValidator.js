import Ajv from "ajv";
import AjvKeywords from "ajv-keywords";
import localize from "ajv-i18n/localize/zh";

const ajv = new Ajv({
  allErrors: true,
});

AjvKeywords(ajv);

const validate = ajv.compile({
  properties: {
    el: {
      instanceOf: "Element",
    },
    initWords: {
      type: "array",
      minItems: 1,
    },
    options: {
      type: "object",
      properties: {
        sizeRange: { type: "array", maxItems: 2, minItems: 2 },
        maxNumber: {
          oneOf: [
            {
              type: "string",
              pattern: "^auto$",
            },
            {
              type: "number",
            },
          ],
        },
        fontStyle: {
          type: "object",
          patternProperties: {
            ".+": {
              type: "string",
            },
          },
        },
        hoverPaused: {
          type: "boolean",
        },
        onClick: {
          typeof: "function",
        },
        additionalProperties: false
      }
    }
  },
  additionalProperties: false
});

export default function (options) {
  const valid = validate(options);
  if (valid) {
    return true;
  } else {
    localize(validate.errors);
    throw new Error(
      "无效的配置项: " + ajv.errorsText(validate.errors, { separator: "\n" })
    );
  }
}
