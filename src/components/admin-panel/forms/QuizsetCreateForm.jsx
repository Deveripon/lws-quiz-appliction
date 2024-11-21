import { useNavigate } from "react-router-dom";
import InputField from "../../common/InputField";
import { useForm } from "react-hook-form";
import cn from "../../../utils/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAdminApiHandlers from "../../../hooks/useAdminApiHandlers";

const QuizsetCreateForm = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { createQuizSet } = useAdminApiHandlers();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    // use Mutation with react query
    const { mutate } = useMutation({
        mutationFn: createQuizSet,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["quizzes"]);
            navigate(`/admin/dashboard/quizzes/${data?.data?.id}`);
        },
        onError: (error) => {
            console.error(error);
        },
    });

    // handle form submittion
    function haddleFormSubmittion(formData) {
        mutate(formData);
    }

    return (
        <form onSubmit={handleSubmit(haddleFormSubmittion)}>
            <InputField
                className='mb-6'
                label='Quiz Title'
                htmlFor='title'
                error={errors.title}
                labelClass='block text-sm font-medium text-gray-700 mb-1'>
                <input
                    {...register("title", {
                        required: "Title is required to add Quiz*",
                        minLength: {
                            value: 5,
                            message: "Title should have at least 5 characters",
                        },
                    })}
                    type='text'
                    id='title'
                    name='title'
                    className={cn(
                        `w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple`,
                        errors.title && "border-red-500 focus:outline-red-500"
                    )}
                    placeholder='Enter Quiz Title'
                />
            </InputField>

            <InputField
                className='mb-6'
                label='Description (Optional)'
                htmlFor='description'
                labelClass='block text-sm font-medium text-gray-700 mb-1'
                error={errors?.description}>
                <textarea
                    {...register("description", {
                        required:
                            "A short description is required to add Quiz*",
                        minLength: {
                            value: 10,
                            message:
                                "description should have at least 10 characters",
                        },
                    })}
                    id='description'
                    name='description'
                    rows={6}
                    className={cn(
                        `w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple'
                    placeholder='Description`,
                        errors?.description &&
                            "border-red-500 focus:outline-red-500"
                    )}
                    defaultValue={""}
                />
            </InputField>

            <button
                type='submit'
                className='w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'>
                Next
            </button>
        </form>
    );
};

export default QuizsetCreateForm;
