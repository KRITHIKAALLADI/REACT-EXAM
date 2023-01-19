import * as React from "react"
import * as yup from "yup"
import {NewSTUDENT_DETAILS,STUDENT_DETAILS} from "./helper"
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import DynamicField from "../DynamicField";
import TextFieldForm from "../SharedComponents/TextFieldForm";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
     SubmitHandler,
     useForm,
     FormProvider,
    } from 'react-hook-form';
import { MIN_HEX_LENGTH, PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import './form.scss';





const StudentForm= () =>{
    interface IStudentForm{
        name?:string;
        rollnumber?:number;
        english?:number;
        telugu?:number;
        hindi?:number;
        maths?:number;
        science?:number;
        social?:number;
        totalmarks?:number;
    }
    const StudentSchema: yup.SchemaOf<IStudentForm>=yup.object().shape({
        name:yup.string().min(5).max(10),
        rollnumber: yup.number(),
        english: yup.number().max(100).min(35),
        telugu: yup.number().max(100).min(35),
        hindi: yup.number().max(100).min(35),
        maths: yup.number().max(100).min(35),
        science: yup.number().max(100).min(35),
        social: yup.number().max(100).min(35),
        totalmarks: yup.number(),   
    })
    const studentFormMethods = useForm<any>({
        mode: "all",
        resolver: async (data, context, options) => {
            return yupResolver(StudentSchema)(data, context, options);
        },
    });

    const [submittedData, setSubmitedData] = React.useState();

    const navigation = useNavigate();
    const studentFormSubmit: SubmitHandler<any> = async (
        data: any,
    ) => {
        setSubmitedData(data); 
        console.log(id);
        
        if (id.id) {
            editForm(data);
        } else {
            createForm(data);
        }
        studentFormMethods.reset({});
        navigation('/view')
    };


    const getAdditionalProps = (item: any) => {
        item.control = studentFormMethods.control;
        item.setValue = studentFormMethods.setValue;
        item.register = studentFormMethods.register;
        return item;
    };


    const id = useParams();

    const [data, setData] = React.useState<any>();
    const getEmployeeData = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/data/${id.id}`);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    const editForm = async (updatedData: any) => {
        try {
            const result = await axios.put(`http://localhost:5000/data/${id.id}`, updatedData);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    const createForm = async (updatedData: any) => {
        const generateNumber: any = Math.random();
        const newData = { ...updatedData, 'id': generateNumber }
        try {
            const result = await axios.post(`http://localhost:5000/data`, newData);
            setData(result.data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getEmployeeData();
    }, [id]);

    useEffect(() => {
        data &&
            Object.entries(data).forEach(([key, value]: any) => {
                studentFormMethods.setValue(key, value, { shouldValidate: true });
            });
    }, [data]);

    console.log(studentFormMethods.watch(), studentFormMethods.formState.errors)
   
    return (
       
        <div className="form">
                       
            <div className="form_header2">
                <h1>Student</h1>
                <p>Details</p>
            </div>
            <div><hr/></div>
            <FormProvider {...studentFormMethods}>
                
                <form onSubmit={studentFormMethods.handleSubmit(studentFormSubmit)}>
                    <div className="form_container">

                        {STUDENT_DETAILS?.map((rows: any) => {
                            return (
                                <div className={`rowThree ${rows.className}`}>
                                    {rows.controls?.map((item: any) => {
                                        const updatedItem = getAdditionalProps(item);
                                        return DynamicField(item.type, updatedItem);
                                    })}
                                </div>
                            );
                        })}

                    </div>
                    <div className="form_footer">
                        <PrimaryButton type="submit"
                            onClick={studentFormMethods.handleSubmit(studentFormSubmit)}

>Submit</PrimaryButton>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
export default StudentForm;





