# Periods are free text, not dates

A Role's Period is a string written per Locale exactly as it should read ("October 2025 - Present", "octubre 2025 - presente"), not a pair of ISO dates formatted with `Intl`. Formatting dates would change the published Spanish wording (for example to "octubre de 2025") and break the rule that content changes only on purpose. Sorting doesn't need dates either: Roles are listed in the order they appear in the data. Don't convert Periods to dates unless you also accept the wording change.
