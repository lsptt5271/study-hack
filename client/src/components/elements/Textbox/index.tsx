type TextboxProps = JSX.IntrinsicElements['input'];

export const Textbox = (props: TextboxProps) => {
  return <input type="text" className={`w-[100px] ${props.className || ''}`} {...props} />;
};
