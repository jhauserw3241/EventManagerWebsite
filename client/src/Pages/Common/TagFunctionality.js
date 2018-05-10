export function formatAgencyTagsForDB(tags) {
    var updatedTags = tags.map(tag => {
        return tag.text;
    });
    return updatedTags;
}