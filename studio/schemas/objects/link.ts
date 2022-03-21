const warning = "You need to delete this or the other link value.";
export default {
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    {
      name: "internal",
      type: "reference",
      title: "Internal link",
      description: "Use this to link to something on this site.",
      hidden: ({ parent }) => !!parent?.external && !parent.internal,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          return value && context.parent?.external ? warning : true;
        }),
      to: [
        {
          type: "route",
        },
        {
          type: "article",
        },
      ],
    },
    {
      name: "external",
      type: "url",
      hidden: ({ parent }) => !!parent?.internal && !parent.external,
      validation: (Rule) => [
        Rule.uri({ scheme: ["https", "mailto", "tel"] }).error(
          "Valid URL schemes are `https`, `mailto` and `tel`"
        ),
        Rule.custom((value, context) => {
          return value && context.parent?.internal;
        }).warning(warning),
      ],
      title: "External",
      description:
        "Use this for links to external domains, email, or telephone numbers.",
    },
    {
      name: "blank",
      type: "boolean",
      title: "Open in new tab or window",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          return value && context.parent?.internal ? "" : true;
        }).warning(
          "Are you sure you want to open this internal link in a new tab or window?"
        ),
      description: `Only use this if the user needs to keep the current page persistent (if there is a form etc.). When true, this will lessen the user experience on mobile devices.`,
    },
  ],
};
