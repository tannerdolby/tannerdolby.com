const { uniqueID, removeChars }  = require("../_includes/js/heading-highlight");

// Testing uniqueH3ID function for generating unique ID values
test("Test unique ID function on regular heading text", () => {
    expect(uniqueID("Some Heading")).toBe("some_heading");
});

test("Test uppercase heading text", () => {
    expect(uniqueID("CONTENT CATEGORIES")).toBe("content_categories");
});

test("Test mismatched case heading text", () => {
    expect(uniqueID("CoNteNt cAteGoRieS")).toBe("content_categories");
});

test("Test non spaced heading text", () => {
    expect(uniqueID("ContentCategories")).toBe("contentcategories");
});

// Testing removeChars function for removing space and non-word chars from manually created IDs
test("test non-word chars and space", () => {
    expect(removeChars("handling&9 mul %id tags")).toBe("handling 9 mul id tags");
});

test("test hyphen case", () => {
    expect(removeChars("handle-mult-tags")).toBe("handle mult tags");
});

test("multiple spaces", () => {
    expect(removeChars("handling  mul  tags")).toBe("handling mul tags");
});