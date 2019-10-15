import { useState, useEffect } from "react";
import validateLogin from "./validateLogin";

function useFormValidation(initialState) {
    const [values, setValues] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0
            if (noErrors) {
                console.log('Authenticated', values)
            }
            setSubmitting(false)
        }
    }, [errors])

    function handleChange(event) {
        event.persist()
        setValues(previousValues => ({
            ...previousValues,
            [event.target.name]: event.target.value
        }))
    }

    function handleBlur() {
        const validationErrors = validateLogin(values);
        setErrors(validationErrors);
        console.log({ errors });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validateLogin(values);
        setSubmitting(true)
        console.log({ errors });
        console.log({ values });
    }

    return { handleSubmit, handleBlur, handleChange, values, errors, isSubmitting }
}

export default useFormValidation;
