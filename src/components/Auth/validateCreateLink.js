export default function validateCreateLink(values) {
    let errors = {}

    if (!values.description) {
        errors.description = "Description required"
    } else if (values.description.length < 10) {
        errors.description = "Description is too short."
    }

    if (!values.url) {
        errors.url = "URL required"
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = "Invalid URL."
    }

    return errors;
}
