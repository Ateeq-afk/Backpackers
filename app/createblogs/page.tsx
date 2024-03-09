'use client'
import Sidebar from '@/Components/Sidebar/Sidebar';
import React, { ChangeEvent,useState,useEffect } from 'react';
import Select from 'react-select';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

// Don't forget to import 'react-quill/dist/quill.snow.css' in your component or app where styles are imported.

interface BlogMain {
    title: string;
    para: string;
    imagealt: string;
    image: File | null;
  }
  interface ActData {
    name: string;
    coverimage: File | null;
    coverimagealt: string;
    type: string;
    date: string;
    title: string;
    urllink: string;
    metatitle: string;
    metades:string;
    destination:string;
    content:string;
    over: string[];
    tourproducts: (Tourproducts | null)[];
    products: (Tourproducts | null)[];
    bloga: (BlogOption | null)[];
    blogproduct: (Blogproduct | null)[];
    activityproduct:  (Activity | null)[];
    blog: BlogMain[];
    photoname: string; // Person's Name
    time: string; // Time Ago
    photo: File | null;
  }
  interface BlogOption {
    value: string;
    label: string;
  }
  interface All {
    _id: string;
    name: string;
  }
  interface Tourproducts {
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
  interface tour{
    _id: string;
    name: string;
  }
  interface Dest {
    urllink: string;
    name: string;
  }
  interface Activity {
    value: string;
    label: string;
    
  }
  interface Blogproduct {
    value: string;
    label: string;
  }
  
  interface Activitymain{
    _id: string;
    name: string;
  }
const page = () => {
    const [actData, setActData] = useState<ActData>({
        name: '',
        coverimage: null,
        coverimagealt: '',
        type: '',
        date:'',
        title:'',
        urllink: '',
        metatitle: '',
        metades:'',
        destination:'',
        content:'',
        over: [],
        tourproducts: [],
        products: [],
        activityproduct:[],
        blogproduct:[],
        blog: [
            { title: '', para: '', imagealt: '', image:null }
          ],
          bloga:[],
          photoname: '', // Initialize Person's Name
          time: '', // Initialize Time Ago
          photo: null,
      });
      const [activityOptions, setActivityOptions] = useState([]);
      const [blogOptions, setBlogOptions] = useState([]);
      const [options,setOptions]= useState([])
      const [tourOptions, settourOptions] = useState([]);
      const [trekOptions, settrekOptions] = useState([]);
      const [destOptions, setDestOptions] = useState([]);
      const [blogTypeOptions, setBlogTypeOptions] = useState([
        { value: 'Blog', label: 'Other blogs' },
        { value: 'Attraction', label: 'Attraction' },
        { value: 'Activities', label: 'Activities' },
        { value: 'Food', label: 'Food' },
        { value: 'Stays', label: 'Stays' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Culture', label: 'Culture' },
        { value: 'Religious', label: 'Religious Sites' },
        { value: 'Camping', label: 'Camping' },
        // Add more blog types as needed
      ]);
  useEffect(() => {
    // Fetch the names and IDs
    const fetchNames = async () => {
      const response = await fetch('http://localhost:4000/blog');
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
    // Fetch the names and IDs
    const fetchNames = async () => {
      const response = await fetch('http://localhost:4000/blog');
      const data = await response.json();
      console.log("data",data)
      const formattedOptions = data.data.map((blog: Blog) => ({
        value: blog._id, // Assuming 'id' is your identifier
        label: blog.name // The name that will be shown in the select dropdown
      }));
      setBlogOptions(formattedOptions);
    };

    
    fetchNames();
  }, []);
  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('https://launch-api1.vercel.app/activity');
      const data = await response.json();
      const formattedOptions = data.data.map((activity: Activitymain) => ({
        value: activity._id,
        label: activity.name
      }));
      setActivityOptions(formattedOptions);
    };
    
    fetchActivities();
  }, []);
useEffect(() => {
  const fetchtrek = async () => {
    const response = await fetch('https://launch-api1.vercel.app/trek/trekfull');
    const data = await response.json();
    const formattedOptions = data.map((trek:trek) => ({
      value: trek._id,
      label: trek.name
    }));
    settrekOptions(formattedOptions);
  }
    fetchtrek();
  }, []);
  useEffect(() => {
    const fetchtour = async () => {
      const response = await fetch('https://launch-api1.vercel.app/trek/tourfull');
      const data = await response.json();
      const formattedOptions = data.map((tour: tour) => ({
        value: tour._id,
        label: tour.name
      }));
      settourOptions(formattedOptions);
    };
  
  fetchtour();
}, []);
useEffect(() => {
    const fetchDest = async () => {
      const response = await fetch('https://launch-api1.vercel.app/dest');
      const data = await response.json();
      const formattedOptions = data.data.map((dest: Dest) => ({
        value: dest.urllink,
        label: dest.name
      }));
      setDestOptions(formattedOptions);
    };
    
    fetchDest();
  }, []);
  const handleTypeChange = (selectedOption: BlogOption | null) => {
    if (selectedOption) {
      setActData(prevState => ({
        ...prevState,
        type: selectedOption.value
      }));
    }
  };
  // Handler for when an option is selected
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const handleSelectBlogChange = (selectedOption: Blogproduct | null, index: number) => {
        if (selectedOption) {
            setActData(prevState => ({
                ...prevState,
                blogproduct: prevState. blogproduct.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };      const handleAddBlogselect = () => {
        setActData(prevState => ({
          ...prevState,
          blogproduct: [...prevState. blogproduct, null] // It's now valid to add null because of the updated type
        }));
      };      const handleRemoveBlogproductSelect = (index: number) => {
        setActData(prevState => ({
          ...prevState,
          blogproduct: prevState. blogproduct.filter((_, i) => i !== index)
        }));
      };
      const handleSelectActivityChange = (selectedOption: Activity | null, index: number) => {
        if (selectedOption) {
            setActData(prevState => ({
                ...prevState,
                activityproduct: prevState.activityproduct.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };      const handleAddActivityselect = () => {
        setActData(prevState => ({
          ...prevState,
          activityproduct: [...prevState.activityproduct, null] // It's now valid to add null because of the updated type
        }));
      };      const handleRemoveActivitySelect = (index: number) => {
        setActData(prevState => ({
          ...prevState,
          activityproduct: prevState.activityproduct.filter((_, i) => i !== index)
        }));
      };
      const handleSelectChange = (selectedOption: BlogOption | null, index: number) => {
        if (selectedOption) {
            setActData(prevState => ({
                ...prevState,
                bloga: prevState.bloga.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
    
      const handleAddBlogSelect = () => {
        setActData(prevState => ({
          ...prevState,
          bloga: [...prevState.bloga, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveBlogSelect = (index: number) => {
        setActData(prevState => ({
          ...prevState,
          bloga: prevState.bloga.filter((_, i) => i !== index)
        }));
      };
      const handleTourproductsChange = (activityOptions: Tourproducts | null, index: number) => {
        if (activityOptions) {
            setActData(prevState => ({
                ...prevState,
                tourproducts: prevState.tourproducts.map((item, i) => (
                    i === index ? activityOptions : item
                ))
            }));
        }
    };
    
      const handleAddTourproductsSelect = () => {
        setActData(prevState => ({
          ...prevState,
          tourproducts: [...prevState.tourproducts, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveTourproductsSelect = (index: number) => {
        setActData(prevState => ({
          ...prevState,
          tourproducts: prevState.tourproducts.filter((_, i) => i !== index)
        }));
      };
      const handleProductsChange = (activityOptions: Tourproducts | null, index: number) => {
        if (activityOptions) {
          setActData(prevState => ({
            ...prevState,
            products: prevState.products.map((item, i) => (
              i === index ? activityOptions : item
            ))
          }));
        }
      };
  
      const handleAddProductsSelect = () => {
        setActData(prevState => ({
          ...prevState,
          products: [...prevState.products, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveProductsSelect = (index: number) => {
        setActData(prevState => ({
          ...prevState,
          products: prevState.products.filter((_, i) => i !== index)
        }));
      };
      
      const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setActData(prevState => ({ ...prevState, [name]: value }));
      };
      const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
          setActData(prevState => ({ ...prevState, [name]: files[0] }));
        }
      };
      const handleChangeArray = (name: keyof ActData, index: number, value: string) => {
        setActData(prev => {
            const array = prev[name];
            if (Array.isArray(array)) { // Ensuring it's an array
                const newArray = [...array] as string[]; // Safe to assert as string[] after Array.isArray check
                newArray[index] = value;
                return { ...prev, [name]: newArray };
            }
            return prev;
        });
      };
      
      const handleAddArrayItem = (field: keyof ActData) => {
        setActData(prevActData => {
            const array = prevActData[field];
            if (Array.isArray(array)) { // Ensure we're working with an array
                const newArray = [...array, '']; // Add an empty string to the array
                return { ...prevActData, [field]: newArray };
            }
            return prevActData; // In case it's not an array, return the state unmodified
        });
    };
    
    const handleRemoveArrayItem = (name: keyof ActData, index: number) => {
        setActData(prev => {
            const array = prev[name];
            if (Array.isArray(array)) { // Ensure we're working with an array
                const newArray = [...array];
                newArray.splice(index, 1); // Remove the item at the specified index
                return { ...prev, [name]: newArray };
            }
            return prev; // In case it's not an array, return the state unmodified
        });
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
  
    //   const handleDayChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     setActData(prev => {
    //       const updatedDays = [...prev.blog as BlogMain[]]; // Type assertion
    //       updatedDays[index] = { ...updatedDays[index], [e.target.name]: e.target.value };
    //       return { ...prev, blog: updatedDays };
    //     });
    //   };
      
    const handleBlogChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setActData(prev => {
          const updatedBlogs = [...prev.blog];
          updatedBlogs[index] = { ...updatedBlogs[index], [name]: value };
          return { ...prev, blog: updatedBlogs };
        });
      };
      
      const handleBlogFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        // Ensure that there's at least one file selected
        if (e.target.files && e.target.files[0]) {
          const updatedDays = [...actData.blog];
          updatedDays[index] = { ...updatedDays[index], image: e.target.files[0] };
          setActData({ ...actData, blog: updatedDays });
        }
      };
      const handleBlogChangepara = (index: number, content: string) => {
        setActData(prev => {
          const updatedBlogs = [...prev.blog];
          updatedBlogs[index] = { ...updatedBlogs[index], para: content };
          return { ...prev, blog: updatedBlogs };
        });
      };
      
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        setIsLoading(true);

        const formData = new FormData();
    
        // Append non-array fields to formData
        for (const [key, value] of Object.entries(actData)) {
            if (!['days', 'over','products','tourproducts','bloga','blog','blogproduct','activityproduct'].includes(key)) {
              formData.append(key, value);
            }
          }
        //   for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        //   }
        actData.blog.forEach((blog, index) => {
            for (const [key, value] of Object.entries(blog)) {
                if (blog.image && blog.image instanceof File) {
                    formData.append(`blogImage[${index}]`, blog.image, blog.image.name);
                  
              } else if (typeof value === 'string' || typeof value === 'number') {
                // All other values that are strings or numbers can be sent as text fields.
                formData.append(`blog[${index}].${key}`, value.toString());
              }
              // Note: If there are other types of fields, you may need to handle them accordingly.
            }
          });
          formData.append('blog', JSON.stringify(actData.blog));

    
      actData.over.forEach((item, index) => {
        formData.append(`over[${index}]`, item.trim());
      });
      if (Array.isArray(actData.bloga)) {
        actData.bloga.forEach((blog, index) => {
          // Check if blog is not null and has a 'value' property
          if (blog && blog.value) {
            formData.append(`bloga[${index}]`, blog.value);
          }
        });
      }
          //   for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
      if (Array.isArray(actData.tourproducts)) {
        actData.tourproducts.forEach((tourproducts, index) => {
          // Check if blog is not null and has a 'value' property
          if (tourproducts && tourproducts.value) {
            formData.append(`tourproducts[${index}]`, tourproducts.value);
          }
        });
      }
      if (Array.isArray(actData.products)) {
        actData.products.forEach((products, index) => {
          // Check if blog is not null and has a 'value' property
          if (products && products.value) {
            formData.append(`products[${index}]`, products.value);
          }
        });
      }
      if (Array.isArray(actData.blogproduct)) {
        actData.blogproduct.forEach((blogproduct, index) => {
          // Check if blog is not null and has a 'value' property
          if (blogproduct && blogproduct.value) {
            formData.append(`blogproduct[${index}]`, blogproduct.value);
          }
        });
      }
      if (Array.isArray(actData.activityproduct)) {
        actData.activityproduct.forEach((activityproduct, index) => {
          // Check if blog is not null and has a 'value' property
          if (activityproduct && activityproduct.value) {
            formData.append(`activityproduct[${index}]`, activityproduct.value);
          }
        });
      }
        try {
          const response = await fetch('http://localhost:4000/blog/createblogs', {
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
      
      const addNewBlog = () => {
        setActData({
          ...actData,
         blog: [...actData.blog, { title: '', para: '', imagealt: '', image:null }],
        });
      };
      
  return (
    <div className='flex'>
     <Sidebar />
     <main className="flex-1">
      <div className="container mx-auto p-10 bg-white">
   <h1 className='text-5xl text-center mb-5 font-bold text-yellow-500'>Create Blogs / Shopping/ Culture/ Food</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
  <div className='border border-gray-700 px-8 py-4 rounded-xl '> 
  <div className='text-4xl font-semibold text-center mb-5 text-gray-700'>Hero section</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Blog Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter the name of the Activity"
        value={actData.name}
        onChange={handleChange}
        className="block w-full border-b border-gray-300 bg-transparent py-2 px-1 text-gray-700  focus:outline-none " required/>
      </div>
      <div>
        <label htmlFor="urllink" className="block text-sm font-medium text-gray-700">Url Link:</label>
        <input type="text" id="urllink" name="urllink" placeholder="Enter the url of Activity" value={actData.urllink} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" required/>
      </div>
    </div>
    <div className='mt-5'>
     <label htmlFor="title" className="block text-sm font-medium text-gray-700">H2 Title:</label>
     <input
       type="text"
       id="title"
       name="title"
       placeholder="Enter the title of the Activity"
       value={actData.title}
       onChange={handleChange}
       className="block w-full border-b border-gray-300 bg-transparent py-2 px-1 text-gray-700 focus:outline-none " required/>
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
          value={actData.coverimagealt}
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
        value={actData.metatitle}
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
  value={destOptions.find((option: any) => option.value === actData.destination)}
  onChange={(selectedOption) => setActData(prevState => ({ ...prevState, destination: selectedOption ? (selectedOption as any).value : ''}))}
  options={destOptions}
/>

      </div>
 </div>
 
 <div className='mt-5'>
        <label htmlFor="metades" className="block text-sm font-medium text-gray-700">Meta Description</label>
        <textarea  id="metades" name="metades" placeholder="Enter the Meta Description of the page" value={actData.metades} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5'>
        <div>
              <label  htmlFor="blogType" className="block text-sm font-medium text-gray-700 ">Blog Type</label>
              <Select  
  className="text-black"              
  id="type"
  name="type"
  placeholder="Select Blog Type"
  value={blogTypeOptions.find(option => option.value === actData.type)}
  onChange={handleTypeChange}
  options={blogTypeOptions}
/>
</div>
<div>
<label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  placeholder="Enter duration of blog to read"
                  value={actData.time}
                  onChange={(e) => setActData({ ...actData, time: e.target.value })}
                  className="block w-full border-b border-gray-300 bg-transparent py-2 px-1 text-gray-700 focus:outline-none"
                />
                </div>
            </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Person's Name:</label>
                <input
                  type="text"
                  id="photo"
                  name="photo"
                  placeholder="Enter person's name"
                  value={actData.photoname}
                  onChange={(e) => setActData({ ...actData, photoname: e.target.value })}
                  className="block w-full border-b border-gray-300 bg-transparent py-2 px-1 text-gray-700 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Creation Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  placeholder="Enter date of creation or random"
                  value={actData.date}
                  onChange={(e) => setActData({ ...actData, date: e.target.value })}
                  className="block w-full border-b border-gray-300 bg-transparent py-2 px-1 text-gray-700 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo:</label>
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  onChange={(e) => setActData({ ...actData, photo: e.target.files ? e.target.files[0] : null })}
                  className="block w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
                />
              </div>
            </div>
 
</div>
    <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Overview Section</h3>
      {actData.over.map((item, index) => (
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
    
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Blog Section</h3>
      {actData.blog.map((blog, index) => (
  <div key={index} className="border border-gray-300 shadow-md p-4 rounded my-4 w-full">
    <div className="flex flex-col gap-4">
      <label className="font-bold text-lg mb-2">Blog Title {index + 1}</label>
      <input
        type="text"
        placeholder="Day Title: 'Day 0', 'Day 1', 'Day 2', and so on"
        name="title"
        value={blog.title}
        onChange={(e) => handleBlogChange(index, e)}
        className="w-full p-3 border border-gray-300 rounded"
      />
        <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={blog.para}
        onChange={(content) => handleBlogChangepara(index, content)}
      />
      <div className="flex items-center gap-2">
        <label className="font-bold text-lg mb-2 flex-shrink-0"> Image:</label>
        <input
          type="file"
          onChange={(e) => handleBlogFileChange(index, e)}
          className="w-full p-3 border border-gray-300 rounded"
        />
              <label className="font-bold text-lg mb-2 flex-shrink-0 "> Image Alt:</label>
      <input
        type="text"
        placeholder="Image Alt Text"
        name="imagealt"
        value={blog.imagealt}
        onChange={(e) => handleBlogChange(index, e)}
        className="w-full p-3 border border-gray-300 rounded"
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
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Similar Tour Section</h3>
      {actData.tourproducts.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(activityOptions) => handleTourproductsChange(activityOptions, index)}
            options={tourOptions}
            className="flex-grow"
            placeholder={`Select Tourproducts Activity #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemoveTourproductsSelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddTourproductsSelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add Tourproducts Select
        </button>
   </div>
</div>



<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Similar Treks Section</h3>
  {actData.products.map((selectedActivity, index) => (
    <div key={index} className="flex flex-row items-center mb-2">
      <Select
        value={selectedActivity}
        onChange={(trekOptions) => handleProductsChange(trekOptions, index)}
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
      Add Products Select Activity
    </button>
  </div>
</div>

<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Blogs Section</h3>
      {actData.bloga.map((selectedBlog, index) => (
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
    {actData.type === 'Activities' || actData.type === 'Stays' || actData.type === 'Camping' ? (
    <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
     <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Related {actData.type}</h3>
     {actData.activityproduct.map((selectedBlog, index) => (
       <div key={index} className="flex flex-row items-center mb-2">
         <Select
           value={selectedBlog}
           onChange={(option) => handleSelectActivityChange(option, index)}
           options={ activityOptions}
           className="flex-grow text-black"
           placeholder={`Select #${index + 1}`}
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
         onClick={handleAddActivityselect}
         className="px-4 py-2 bg-yellow-500 text-white rounded"
       >
         Add {actData.type}
       </button>
     </div>
   </div>
        ) : null}
   {actData.type === 'Blog' || actData.type === 'Food' || actData.type === 'Culture'  || actData.type === 'Shopping' ?  (
   <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
     <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Related {actData.type}</h3>
     {actData.blogproduct.map((selectedBlog, index) => (
       <div key={index} className="flex flex-row items-center mb-2">
         <Select
           value={selectedBlog}
           onChange={(option) => handleSelectBlogChange(option, index)}
           options={blogOptions}
           className="flex-grow text-black"
           placeholder={`Select #${index + 1}`}
           isClearable
         />
         <button
           type="button"
           onClick={() => handleRemoveBlogproductSelect(index)}
           className="bg-red-500 text-white px-2 py-1 rounded ml-2"
         >
           Remove
         </button>
       </div>
     ))}
     <div className="flex justify-center mt-2">
       <button
         type="button"
         onClick={handleAddBlogselect}
         className="px-4 py-2 bg-yellow-500 text-white rounded"
       >
         Add {actData.type}
       </button>
     </div>
   </div>
     ) : null}
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



