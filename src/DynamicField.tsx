

import TextFieldForm from "./SharedComponents/TextFieldForm";

export const DynamicField = (fieldName: string, item: any) => {
    switch (fieldName) {  
      
        case "TextFieldForm":
            return <TextFieldForm {...item} />;

        default:
            return 'Component Missing';
    }
};
export default DynamicField;
