'use client'
import React, { ChangeEvent,useState,useEffect } from 'react';
import Select from 'react-select';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Sidebar from '@/Components/Sidebar/Sidebar';
import { uploadFileToS3 } from "../aws"

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface BlogMain {
    title: string;
    para: string;
    imagealt: string;
    image: File | string;
  }
    interface FAQ {
    question: string;
    answer: string;
  }
  interface AttData {
    name: string;
    coverimage: File | string;
    coverimagealt: string;
    type: string;
    urllink: string;
    metatitle: string;
    metades:string;
    destination:string;
    over: string[];
    desc: string[];
    content: BlogMain[];
    mustattraction: (Tourmustattraction | null)[];
    attraction: (attraction | null)[];
    activity:(activity | null)[];
    bloga: (BlogOption | null)[];
    faq: FAQ[];
    AttractionType: string;
    reach: string;
  label: string;
  timings: string;
  timeRequired: string;
  entryFee: string; // Added for blog type selection
  }
  interface BlogOption {
    value: string;
    label: string;
  }
  interface attraction {
    value: string;
    label: string;
  }
  interface activity {
    value: string;
    label: string;
  }
  interface Activity {
    _id: string;
    name: string;
  }
  interface Tourmustattraction  {
    value: string;
    label: string;
  }
  interface Blog {
    _id: string;
    name: string;
  }
  interface trek {
    _id: string;
    name: string;
  }
  interface Dest {
    urllink: string;
    name: string;
  }
  interface Attractiontype {
    value: string;
    label: string;
  }
const page = () => {
    const [AttData, setAttData] = useState<AttData>({
        name: '',
        coverimage: '',
        coverimagealt: '',
        type: '',
        urllink: '',
        metatitle: '',
        metades:'',
        destination:'',
        desc:[],
        over: [],
        attraction: [],
        mustattraction: [],
        activity: [],
        content: [
            { title: '', para: '', imagealt: '', image:'' }
          ],
          faq:[
            {question:'', answer:''}
          ],
          bloga:[],
          AttractionType: '',
          reach: '',
          label: '',
          timings: '',
          timeRequired: '',
          entryFee: '', // Initialize AttractionType
      });
      const [options, setOptions] = useState([]);
      const [trekOptions, settrekOptions] = useState([]);
      const [destOptions, setDestOptions] = useState([]);
      const [activityOptions, setActivityOptions] = useState([]);
      const [AttractionTypeOptions, setAttractionTypeOptions] = useState([
        { value: 'Bangalore, Karnataka', label: 'Bangalore, Karnataka' },
        { value: 'Mysore, Karnataka', label: 'Mysore, Karnataka' },
        { value: 'Chikamagaluru, Karnataka', label: 'Chikamagaluru, Karnataka' },
        { value: 'Sakleshpur, Karnataka', label: 'Sakleshpur, Karnataka' },
        { value: 'Hampi, Karnataka', label: 'Hampi, Karnataka' },
        { value: 'Coorg, Karnataka', label: 'Coorg, Karnataka' },
        { value: 'Udupi, Karnataka', label: 'Udupi, Karnataka' },
        { value: 'Mangalore, Karnataka', label: 'Mangalore, Karnataka' },
        { value: 'Gokarna, Karnataka', label: 'Gokarna, Karnataka' },
        { value: 'Murudeshwara, Karnataka', label: 'Murudeshwara, Karnataka' },
        { value: 'Sagar, Karnataka', label: 'Murudeshwara, Karnataka' },
        { value: 'Shimoga, Karnataka', label: 'Shimoga , Karnataka' },
        { value: 'Hubli, Karnataka', label: 'Hubli, Karnataka' },
        { value: 'Dharwad, Karnataka', label: 'Dharwad, Karnataka' },
        { value: 'Belgaum (Belagavi), Karnataka', label: 'Belgaum (Belagavi), Karnataka' },
        { value: 'Bijapur, Karnataka', label: 'Bijapur, Karnataka' },
        { value: 'Karwar, Karnataka', label: 'Karwar, Karnataka' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Wayanand, Kerala', label: 'Wayanand, Kerala' },
        { value: 'Kannur, Kerala', label: 'Kannur, Kerala' },
        { value: 'Kozhikode (Calicut), Kerala', label: 'Kozhikode (Calicut), Kerala' },
        { value: 'Munnar, Kerala', label: 'Munnar, Kerala' },
        { value: 'Kochi, Kerala', label: 'Kochi, Kerala' },
        { value: 'Thekkady, Kerala', label: 'Thekkady, Kerala' },
        { value: 'Varkala, Kerala', label: 'Varkala, Kerala' },
        { value: 'Alleppey, Kerala', label: 'Alleppey, Kerala' },
        { value: 'Vagamon, Kerala', label: 'Vagamon, Kerala' },
        { value: 'Thiruvananthapuram, Kerala', label: 'Thiruvananthapuram, Kerala' },
        { value: 'Chennai, Tamil Nadu', label: 'Chennai, Tamil Nadu' },
        { value: 'Madurai, Tamil Nadu', label: 'Madurai, Tamil Nadu' },
        { value: 'Ooty, Tamil Nadu', label: 'Ooty, Tamil Nadu' },
        { value: 'Kodaikanal, Tamil Nadu', label: 'Kodaikanal, Tamil Nadu' },
        { value: 'Valparai, Tamil Nadu', label: 'Valparai, Tamil Nadu' },
        { value: 'Rameswaram, Tamil Nadu', label: 'Rameswaram, Tamil Nadu' },
        { value: 'Kanyakumari, Tamil Nadu', label: 'Kanyakumari, Tamil Nadu' },
        { value: 'Pondicherry, Puducherry (Union Territory)', label: 'Pondicherry, Puducherry (Union Territory)' },
        { value: 'Lakshadweep (Union Territory)', label: 'Pondicherry, Lakshadweep (Union Territory)' },
        { value: 'Andaman and Nicobar Islands (Union Territory)', label: 'Andaman and Nicobar Islands (Union Territory)' },
        { value: 'Hyderabad, Telangana', label: 'Hyderabad, Telangana' },
        { value: 'Warangal, Telangana', label: 'Warangal, Telangana' },
        { value: 'Visakhapatnam, Andhra Pradesh', label: 'Visakhapatnam, Andhra Pradesh' },
        { value: 'Tirupati, Andhra Pradesh', label: 'Tirupati, Andhra Pradesh' },
        { value: 'Araku Valley, Andhra Pradesh', label: 'Araku Valley, Andhra Pradesh' },
      ]);
      const handleTypeChange = (selectedOption: Attractiontype | null) => {
        if (selectedOption) {
            setAttData(prevState => ({
            ...prevState,
            AttractionType: selectedOption.value
          }));
        }
      };
          // Toolbar modules configuration
    const modules = {
        toolbar: [
          [{ 'font': [] }],
          [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean'],
          ['code-block'],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#fcb418'] }, 
           { 'background': [] }], // Specify the colors you want to include
          [{ 'align': [] }],
        ],
      };
  
  const formats = [
   'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'clean',
    'code-block',
    'color', 'background', 'align',
  ];
  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('https://launch-api1.vercel.app/activity');
      const data = await response.json();
      const formattedOptions = data.data.map((activity: Activity) => ({
        value: activity._id,
        label: activity.name
      }));
      setActivityOptions(formattedOptions);
    };
    
    fetchActivities();
  }, []);
  useEffect(() => {
    // Fetch the names and IDs
    const fetchNames = async () => {
      const response = await fetch('https://launch-api1.vercel.app/blog');
      const data = await response.json();
      const formattedOptions = data.data.map((blog: Blog) => ({
        value: blog._id, // Assuming 'id' is your identifier
        label: blog.name // The name that will be shown in the select dropdown
      }));
      setOptions(formattedOptions);
    };
    
    fetchNames();
  }, []);
useEffect(() => {
  const fetchtrek = async () => {
    const response = await fetch('https://launch-api1.vercel.app/attraction');
    const data = await response.json();
    const formattedOptions = data.data.map((trek:trek) => ({
      value: trek._id,
      label: trek.name
    }));
    settrekOptions(formattedOptions);
  }
    fetchtrek();
  }, []);
  
useEffect(() => {
    const fetchDest = async () => {
      const response = await fetch('https://launch-api1.vercel.app/dest');
      const data = await response.json();
      const formattedOptions = data.data.map((dest: any) => ({
        value: dest.urllink,
        label: dest.name
      }));
      setDestOptions(formattedOptions);
    };
    
    fetchDest();
  }, []);
  // Handler for when an option is selected
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const handleSelectChange = (selectedOption: BlogOption | null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                bloga: prevState.bloga.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
    
      const handleAddBlogSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          bloga: [...prevState.bloga, null] // It's now valid to add null because of the updated type
        }));
      };
      const handleAddFaqItem = () => {
        setAttData({  ...AttData,
            faq: [
              ...AttData.faq,
              {
           question: '', answer: '' }
        ],
              })
    
      };

      const handleRemoveBlogSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          bloga: prevState.bloga.filter((_, i) => i !== index)
        }));
      };


      const handleTourproductsChange = (activityOptions: attraction | null, index: number) => {
        if (activityOptions) {
            setAttData(prevState => ({
                ...prevState,
                attraction: prevState.attraction.map((item, i) => (
                    i === index ? activityOptions : item
                ))
            }));
        }
    };
    
      const handleAddProductsSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          attraction: [...prevState.attraction, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveProductsSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          attraction: prevState.attraction.filter((_, i) => i !== index)
        }));
      };
      const handleActivityChange = (activityOptions: activity | null, index: number) => {
        if (activityOptions) {
            setAttData(prevState => ({
                ...prevState,
                activity: prevState.activity.map((item, i) => (
                    i === index ? activityOptions : item
                ))
            }));
        }
    };
    
      const handleAddActivitySelect = () => {
        setAttData(prevState => ({
          ...prevState,
          activity: [...prevState.activity, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveActivitySelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          activity: prevState.activity.filter((_, i) => i !== index)
        }));
      };
      const handleTourmustseeattractionChange = (activityOptions: Tourmustattraction | null, index: number) => {
        if (activityOptions) {
            setAttData(prevState => ({
                ...prevState,
                mustattraction: prevState.mustattraction.map((item, i) => (
                    i === index ? activityOptions : item
                ))
            }));
        }
    };
    
      const handleAddMustseeattractionSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          mustattraction: [...prevState.mustattraction, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveMustseeattractionSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          mustattraction: prevState.mustattraction.filter((_, i) => i !== index)
        }));
      };

      
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAttData(prevState => ({ ...prevState, [name]: value }));
      };
      const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
          const uploadResult = await uploadFileToS3(files[0]);
          if (uploadResult) {
            setAttData(prevState => ({
              ...prevState,
              [name]: uploadResult.name, // Storing the filename in S3 format in 'coverimage'
            }));
          }
        }
      };
      const handleChangeArray = (name: keyof AttData, index: number, value: string) => {
        setAttData(prev => {
            const array = prev[name];
            if (Array.isArray(array)) { // Ensuring it's an array
                const newArray = [...array] as string[]; // Safe to assert as string[] after Array.isArray check
                newArray[index] = value;
                return { ...prev, [name]: newArray };
            }
            return prev;
        });
      };
      
      const handleAddArrayItem = (field: keyof AttData) => {
        setAttData(prevAttData => {
            const array = prevAttData[field];
            if (Array.isArray(array)) { // Ensure we're working with an array
                const newArray = [...array, '']; // Add an empty string to the array
                return { ...prevAttData, [field]: newArray };
            }
            return prevAttData; // In case it's not an array, return the state unmodified
        });
    };
    
    const handleRemoveArrayItem = (name: keyof AttData, index: number) => {
        setAttData(prev => {
            const array = prev[name];
            if (Array.isArray(array)) { // Ensure we're working with an array
                const newArray = [...array];
                newArray.splice(index, 1); // Remove the item at the specified index
                return { ...prev, [name]: newArray };
            }
            return prev; // In case it's not an array, return the state unmodified
        });
    };
    const handleBlogChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAttData(prev => {
          const updatedBlogs = [...prev.content];
          updatedBlogs[index] = { ...updatedBlogs[index], [name]: value };
          return { ...prev, content: updatedBlogs };
        });
      };
      
    //   const handleBlogFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    //     // Ensure that there's at least one file selected
    //     if (e.target.files && e.target.files[0]) {
    //       const updatedDays = [...AttData.content];
    //       updatedDays[index] = { ...updatedDays[index], image: e.target.files[0] };
    //       setAttData({ ...AttData, content: updatedDays });
    //     }
    //   };
    const handleBlogFileChange = async (index: number, e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          
          // Perform the upload
          const uploadResult = await uploadFileToS3(file);
          if (uploadResult) {
            // Update state with the S3 file name
            const updatedDays = [...AttData.content];
            updatedDays[index] = { 
              ...updatedDays[index], 
              image: uploadResult.name, // Store the S3 file name in the 'image' field
            };
            setAttData({ ...AttData, content: updatedDays });
          } else {
            // Handle the failure (e.g., display an error message)
            console.error("Failed to upload file.");
          }
        }
      };
      const handleBlogChangepara = (index: number, content: string) => {
        setAttData(prev => {
          const updatedBlogs = [...prev.content];
          updatedBlogs[index] = { ...updatedBlogs[index], para: content };
          return { ...prev, content: updatedBlogs };
        });
      };
    const addNewBlog = () => {
        setAttData({
          ...AttData,
          content: [...AttData.content, { title: '', para: '', imagealt: '', image:'' }],
        });
      };
      
      
      const handleFaqChange =(index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const updatedfaq = [...AttData.faq];
        updatedfaq[index] = { ...updatedfaq[index], [e.target.name]: e.target.value };
        setAttData({ ...AttData, faq: updatedfaq});
      };


      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        setIsLoading(true);

        const formData = new FormData();
    
        // Append non-array fields to formData
        for (const [key, value] of Object.entries(AttData)) {
            if (![ 'over','attraction','mustattraction','activity','bloga','faq','content'].includes(key)) {
              formData.append(key, value);
            }
          }
        //   for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        //   }
        AttData.faq.forEach((batch, index) => {
            formData.append(`faq[${index}].question`, batch.question);
            formData.append(`faq[${index}].answer`, batch.answer);
          });
          formData.append('faq', JSON.stringify(AttData.faq));
          AttData.content.forEach((content, index) => {
            for (const [key, value] of Object.entries(content)) {
           if (typeof value === 'string' || typeof value === 'number') {
                // All other values that are strings or numbers can be sent as text fields.
                formData.append(`content[${index}].${key}`, value.toString());
              }
              // Note: If there are other types of fields, you may need to handle them accordingly.
            }
          });
          formData.append('content', JSON.stringify(AttData.content));

      AttData.over.forEach((item, index) => {
        formData.append(`over[${index}]`, item.trim());
      });
      if (Array.isArray(AttData.bloga)) {
        AttData.bloga.forEach((blog, index) => {
          // Check if blog is not null and has a 'value' property
          if (blog && blog.value) {
            formData.append(`bloga[${index}]`, blog.value);
          }
        });
      }
          //   for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
      if (Array.isArray(AttData.attraction)) {
        AttData.attraction.forEach((attraction, index) => {
          // Check if blog is not null and has a 'value' property
          if (attraction && attraction.value) {
            formData.append(`attraction[${index}]`, attraction.value);
          }
        });
      }
      if (Array.isArray(AttData.mustattraction)) {
        AttData.mustattraction.forEach((mustattraction, index) => {
          // Check if blog is not null and has a 'value' property
          if (mustattraction && mustattraction.value) {
            formData.append(`mustattraction[${index}]`, mustattraction.value);
          }
        });
      }
      if (Array.isArray(AttData.activity)) {
        AttData.activity.forEach((activity, index) => {
          // Check if blog is not null and has a 'value' property
          if (activity && activity.value) {
            formData.append(`activity[${index}]`, activity.value);
          }
        });
      }
        try {
          const response = await fetch('http://localhost:4000/attraction/createattraction', {
            method: 'POST',
            body: formData,
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json();
          console.log(data);
          alert("Data successfully uploaded");
        } catch (error) {
          console.error('Error submitting form:', error);
          alert("Data upload error");
        } finally {
            setIsLoading(false); // Disable loading state regardless of outcome
          }
      };
      

      
  return (
    <div className='flex'>
    <Sidebar />
    <main className="flex-1">
      <div className="container mx-auto p-10 bg-white">
   <h1 className='text-5xl text-center mb-5 font-bold text-yellow-500'>Create Attraction/Religious Sites</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
  <div className='border border-gray-700 px-8 py-4 rounded-xl '> 
  <div className='text-4xl font-semibold text-center mb-5 text-gray-700'>Hero section</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Attraction Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter the name of the Attraction"
        value={AttData.name}
        onChange={handleChange}
        className="block w-full border-b border-gray-300 bg-transparent py-2 px-1 text-gray-700  focus:outline-none " required/>
      </div>
      <div>
        <label htmlFor="urllink" className="block text-sm font-medium text-gray-700">Url Link:</label>
        <input type="text" id="urllink" name="urllink" placeholder="Enter the url of Attraction" value={AttData.urllink} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" required/>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Repeat this block for each Cover Image and Alt Text pair */}
      
      {/* Pair 1 */}
      <div className="space-y-2 mt-5">
        <label htmlFor="coverimage" className="block text-sm font-medium text-gray-700">
          Cover Image:
        </label>
        <input
          type="file"
          id="coverimage"
          name="coverimage"
          onChange={handleFileChange}
          className="block w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2 mt-5">
        <label htmlFor="coverimagealt" className="block text-sm font-medium text-gray-700 mt-[7px]">
          Image Alt Text:
        </label>
        <input
          type="text"
          id="coverimagealt"
          name="coverimagealt"
          placeholder="Image Alt text"
          value={AttData.coverimagealt}
          onChange={handleChange}
          className=" w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>

    
      <div>
      <label htmlFor="metatitle" className="block text-sm font-medium text-gray-700">Meta Title</label>
      <input
        type="text"
        id="metatitle"
        name="metatitle"
        placeholder="Enter the Meta Title of the Activity"
        value={AttData.metatitle}
        onChange={handleChange}
        className="block w-full border-b border-gray-300 bg-transparent py-2 px-1 text-gray-700  focus:outline-none " required/>
      </div>
      
      <div>
      <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination Name</label>
      <Select
  className="text-black"              
  id="destination"
  name="destination"
  placeholder="Select Destination"
  value={destOptions.find((option: any) => option.value === AttData.destination)}
  onChange={(selectedOption) => setAttData(prevState => ({ ...prevState, destination: selectedOption ? (selectedOption as any).value : ''}))}
  options={destOptions}
/>

      </div>
 </div>
 
 <div className='mt-5'>
        <label htmlFor="metades" className="block text-sm font-medium text-gray-700">Meta Description</label>
        <textarea  id="metades" name="metades" placeholder="Enter the Meta Description of the page" value={AttData.metades} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
      </div>
      <div>
              <label  htmlFor="AttractionType" className="block text-sm font-medium text-gray-700 mt-5">Location Place</label>
              <Select  
                className="text-black"              
                id="AttractionType"
                name="AttractionType"
                placeholder="Select Location Place"
                value={AttractionTypeOptions.find(option => option.value === AttData.AttractionType)}
                onChange={handleTypeChange}
                options={AttractionTypeOptions}
              />
            </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              
            </div>
 
</div>
    <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Overview Section</h3>
      {AttData.over.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row justify-between gap-2 items-center mb-2">
          <textarea value={item} placeholder={`Overview Para ${index + 1}`} onChange={(e) => handleChangeArray('over', index, e.target.value)} className="p-2 border border-gray-300 rounded w-full text-gray-700 " />
          <button type="button" onClick={() => handleRemoveArrayItem('over', index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
        </div>
      ))}
       <div className="flex justify-center mt-2"> {/* Flex container for center alignment */}
    <button 
      type="button" 
      onClick={() => handleAddArrayItem('over')} 
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Add Overview
    </button>
  </div>
   

</div>
<div className='flex'>
    {/* ... (rest of your component) */}

    {/* New fields section */}
    <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Additional Details Section</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* reach input */}
        <div>
          <label htmlFor="reach" className="block text-sm font-medium text-gray-700">How to Reach:</label>
          <input
            type="text"
            id="reach"
            name="reach"
            value={AttData.reach}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="How to Reach"
          />
        </div>
        {/* Label input */}
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label:</label>
          <input
            type="text"
            id="label"
            name="label"
            value={AttData.label}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="Must Visit"
          />
        </div>
        
        {/* Timings input */}
        <div>
          <label htmlFor="timings" className="block text-sm font-medium text-gray-700">Timings:</label>
          <input
            type="text"
            id="timings"
            name="timings"
            value={AttData.timings}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="Anytime"
          />
        </div>
        {/* Time Required input */}
        <div>
          <label htmlFor="timeRequired" className="block text-sm font-medium text-gray-700">Time Required:</label>
          <input
            type="text"
            id="timeRequired"
            name="timeRequired"
            value={AttData.timeRequired}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="1-2 hours"
          />
        </div>
        {/* Entry Fee input */}
        <div>
          <label htmlFor="entryFee" className="block text-sm font-medium text-gray-700">Entry Fee:</label>
          <input
            type="text"
            id="entryFee"
            name="entryFee"
            value={AttData.entryFee}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="Free"
          />
        </div>
      </div>
    </div>

    {/* ... (rest of your component) */}
  </div>

  <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Content Section</h3>
      {AttData.content.map((content, index) => (
  <div key={index} className="border border-gray-300 shadow-md p-4 rounded my-4 w-full">
    <div className="flex flex-col gap-4">
      <label className="font-bold text-lg mb-2 text-black">Content Title {index + 1}</label>
      <input
        type="text"
        placeholder="Name of the content"
        name="title"
        value={content.title}
        onChange={(e) => handleBlogChange(index, e)}
        className="w-full p-3 border border-gray-300 rounded text-black"
      />
        <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={content.para}
        onChange={(content) => handleBlogChangepara(index, content)}
        className='text-black'
      />
      <div className="flex items-center gap-2">
        <label className="font-bold text-lg mb-2 flex-shrink-0 text-black"> Image:</label>
        <input
          type="file"
          onChange={(e) => handleBlogFileChange(index, e)}
          className="w-full p-3 border border-gray-300 rounded text-black"
        />
              <label className="font-bold text-lg mb-2 flex-shrink-0 text-black "> Image Alt:</label>
      <input
        type="text"
        placeholder="Image Alt Text"
        name="imagealt"
        value={content.imagealt}
        onChange={(e) => handleBlogChange(index, e)}
        className="w-full p-3 border border-gray-300 rounded text-black"
      />
      </div>
      {/* Image Alt Text */}

    </div>
  </div>
))}
<button
  type="button"
  onClick={addNewBlog}
  className="px-4 py-2 bg-yellow-500 text-white rounded  transition-colors duration-300  mt-4"
>
  Add New Blog
</button>

          </div>
  <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Must see Attraction Section</h3>
  {AttData.mustattraction.map((selectedActivity, index) => (
    <div key={index} className="flex flex-row items-center mb-2">
      <Select
        value={selectedActivity}
        onChange={(trekOptions) => handleTourmustseeattractionChange(trekOptions, index)}
        options={trekOptions}
        className="flex-grow text-black"
        placeholder={`Select Products Activity #${index + 1}`}
        isClearable
      />
      <button
        type="button"
        onClick={() => handleRemoveMustseeattractionSelect (index)}
        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
      >
        Remove
      </button>
    </div>
  ))}
  <div className="flex justify-center mt-2">
    <button
      type="button"
      onClick={handleAddMustseeattractionSelect }
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Add Must See Attraction
    </button>
  </div>
</div>

<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Similar Attraction Section</h3>
  {AttData.attraction.map((selectedActivity, index) => (
    <div key={index} className="flex flex-row items-center mb-2">
      <Select
        value={selectedActivity}
        onChange={(trekOptions) => handleTourproductsChange(trekOptions, index)}
        options={trekOptions}
        className="flex-grow text-black"
        placeholder={`Select Products Activity #${index + 1}`}
        isClearable
      />
      <button
        type="button"
        onClick={() => handleRemoveProductsSelect(index)}
        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
      >
        Remove
      </button>
    </div>
  ))}
  <div className="flex justify-center mt-2">
    <button
      type="button"
      onClick={handleAddProductsSelect}
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Add Attraction
    </button>
  </div>
</div>
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4 ">FAQ Section </h3>
{AttData.faq.map((faq, index) => (
  <div key={index} className="border p-4 rounded flex justify-between items-center">
    <div className="flex-1 mr-2">
      <label className="font-bold text-black">Faq {index + 1}</label>
      <input
       type="text"
        name="question"
        placeholder="Enter the question"
        value={faq.question}
        onChange={(e) => handleFaqChange(index, e)}
        className="p-2 border border-gray-300 rounded w-full text-black"
      />
    </div>
    <div className="w-[450px] pt-6">
      <input
        type="text"
        placeholder="Enter the answer"
        name="answer"
        value={faq.answer}
        onChange={(e) => handleFaqChange(index, e)}
        className="p-2 border border-gray-300 rounded w-full text-black"
      />
    </div>
    <button
      type="button"
      onClick={() => handleRemoveArrayItem('faq', index)}
      className="ml-2 mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
    >
      Remove
    </button>
  </div>
))}

<button
  type="button"
  onClick={handleAddFaqItem}
  className="px-4 py-2 bg-yellow-500 text-white rounded mt-4"
>
  Add FAQ
</button>
</div>

<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Related Activities Section</h3>
      {AttData.activity.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(activityOptions) => handleActivityChange(activityOptions, index)}
            options={activityOptions}
            className="flex-grow text-black"
            placeholder={`Select Similar Activity #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemoveActivitySelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddActivitySelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add Similar Select
        </button>
   </div>
</div>
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Blogs Section</h3>
      {AttData.bloga.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(option) => handleSelectChange(option, index)}
            options={options}
            className="flex-grow text-black"
            placeholder={`Select Blog #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemoveBlogSelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddBlogSelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add Blog Select
        </button>
      </div>
    </div>

      <div className='flex justify-center'>
      <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black focus:outline-none"
              disabled={isLoading}
            >
              Submit
            </button>
    </div>

        {isLoading && (
  <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }}>
    <span style={{ color: 'white', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</span>
  </div>
)}
  </form>
</div>
</main>
    </div>
  )
}

export default page