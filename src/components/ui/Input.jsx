export const  TextInput = ({ label, name, register, required, errors, minLength, maxLength, placeholder,...rest }) => {
  return (
    <div  >
      {label && <label htmlFor={name} className="block mb-1 font-semibold text-gray-700">{label}</label>}

      <input
        id={name}
        type="text"
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label || name} is required` : false,
          minLength: minLength ? { value: minLength, message: `${label || name} must be at least ${minLength} characters` } : undefined,
          maxLength: maxLength ? { value: maxLength, message: `${label || name} must be at most ${maxLength} characters` } : undefined,
        })}
        className={`w-full bg-[#F3F4F6] px-3 h-[46px]  rounded-md outline-0 placeholder:text-[#6B7280] text-black/70  ${errors[name] ? 'border-red-500' : ' '}`}
        {...rest}
      />

      {errors[name] && (
        <p className="text-sm text-red-500 mt-1">{errors[name].message}</p>
      )}
    </div>
  );
};
 