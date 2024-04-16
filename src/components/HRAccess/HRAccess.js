import React, { useState ,useEffect} from 'react'
import { EmployeeCard,AllEmployees,DisplayEmp,Modal } from './HRAccess.styles';



const employees = [
  { "name": "John", "surname": "Doe", "email": "john.doe@gmail.com", "emp_type": "Staff" },
  { "name": "Jane", "surname": "Smith", "email": "jane.smith@gmail.com", "emp_type": "Manager" },
  { "name": "Alice", "surname": "Johnson", "email": "alice.johnson@gmail.com", "emp_type": "HR" },
  { "name": "Michael", "surname": "Williams", "email": "michael.williams@gmail.com", "emp_type": "Staff" },
  { "name": "Emily", "surname": "Brown", "email": "emily.brown@gmail.com", "emp_type": "Manager" },
  { "name": "Daniel", "surname": "Jones", "email": "daniel.jones@gmail.com", "emp_type": "HR" },
  { "name": "Olivia", "surname": "Taylor", "email": "olivia.taylor@gmail.com", "emp_type": "Staff" },
  { "name": "William", "surname": "Davis", "email": "william.davis@gmail.com", "emp_type": "Manager" },
  { "name": "Sophia", "surname": "Miller", "email": "sophia.miller@gmail.com", "emp_type": "HR" },
  { "name": "Matthew", "surname": "Wilson", "email": "matthew.wilson@gmail.com", "emp_type": "Staff" },
  { "name": "Ethan", "surname": "Moore", "email": "ethan.moore@gmail.com", "emp_type": "Manager" },
  { "name": "Ava", "surname": "Anderson", "email": "ava.anderson@gmail.com", "emp_type": "HR" },
  { "name": "David", "surname": "Thomas", "email": "david.thomas@gmail.com", "emp_type": "Staff" },
  { "name": "Madison", "surname": "Jackson", "email": "madison.jackson@gmail.com", "emp_type": "Manager" },
  { "name": "Liam", "surname": "White", "email": "liam.white@gmail.com", "emp_type": "HR" },
  { "name": "Mia", "surname": "Harris", "email": "mia.harris@gmail.com", "emp_type": "Staff" }
];



const Emp = ({ employee, index, removeEmp, empType, setEmpType }) => {
    const typeChange = (event) => {
      setEmpType(event.target.value, index); // Pass the index along with the new value
    };
    const [text,settext]=useState('Select Employee Type:')//error
    const [update,setupdate]=useState(employee.emp_type)


    const updateEmp=()=>{
        console.log(empType)
        if(!empType){
            settext('Enter a Type')

        }
        else if(empType===employee.emp_type){
            settext('They are already under '+employee.emp_type)


        }
        else {
            //update their type here
            // employee.emp_type=empType
            setupdate(empType)
            settext('Success ')

            employee.emp_type=empType;
            
        }
    }
  
    return (
      <EmployeeCard>
        <p>Name: {employee.name}</p>
        <p>Surname: {employee.surname}</p>
        <p>Email: {employee.email}</p>
        <p>Employee Type: {update}</p>
        <label htmlFor={`employeeType-${index}`}>{text}</label>
        <select id={`employeeType-${index}`} value={empType} onChange={typeChange}>
          <option value=""></option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
        <button onClick={updateEmp}>Change type</button>
        <button onClick={() => removeEmp(employee.email, index)}>Remove</button>
      </EmployeeCard>
    );
  };

const HRAccess = () => {
  const [empClicked,setempCLicked]=useState(false);
  const [allEmployeedata, setallEmployeedata] = useState(null);



  useEffect(() => {//runs until allEmployees data is not null anymore
    // const fetchData = async () => {//databse fectch
    //   try {
    //     const response = await fetch('https://api.example.com/data');
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch data');
    //     }
    //     const data = await response.json();
    //     setallEmployeedata(data);
    //   } catch (error) {

    //   } 
    // };
    const fetchData=()=>{
            setallEmployeedata(employees);
    };
  
    fetchData();
  }, []); 
  
  const displayEmp=()=>{//button for displaying employees
    setempCLicked(prev=>!prev);  
  };

 

  const removeEmp=(email,index)=>{
    //query to remove email with row




    setallEmployeedata(prevArray => {
        const newArray = [...prevArray];
        newArray.splice(index, 1);
        return newArray;
    });
  };

  const [empType, setEmpType] = useState({});

  const setEmpTypeAtIndex = (type, index) => {
    setEmpType((prev) => {
      const updatedTypes = { ...prev };
      updatedTypes[index] = type; // Set the new type for the specified index
      return updatedTypes;
    });
  };



  return (
   <> 
   <DisplayEmp onClick={displayEmp}>
    Show all employees
   </DisplayEmp>

   {empClicked?
       <AllEmployees>
     
       <h2>Employee List</h2>
       <section>
         {allEmployeedata.map((employee, index) => (

        <Emp
                key={index}
                employee={employee}
                index={index}
                removeEmp={removeEmp}
                empType={empType[index] || ''}
                setEmpType={setEmpTypeAtIndex}
              />
         ))}
       </section>
     </AllEmployees>:
     null
   
  }



  </>
  )
}

export default HRAccess

