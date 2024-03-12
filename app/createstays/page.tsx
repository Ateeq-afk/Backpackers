'use client'
import Sidebar from '@/Components/Sidebar/Sidebar'
import React, { ChangeEvent,useState,useEffect } from 'react';
import Select from 'react-select';

  interface Booking {
    bookingname: string;
    duration: string;
    fromamount: string;
    amount: string;
  }
  interface FAQ {
    question: string;
    answer: string;
  }
  interface ActData {
    name: string;
    coverimage: File | null;
    coverimagealt: string;
    coverimage2: File | null;
    coverimagealt2: string;
    coverimage3: File | null;
    coverimagealt3: string;
    coverimage4: File | null;
    coverimagealt4: string;
    coverimage5: File | null;
    coverimagealt5: string;
    coverimage6: File | null;
    coverimagealt6: string;
    type: string;
    urllink: string;
    metatitle: string;
    metades:string;
    destination:string;
    amount: string;
    fromamount: string;
    over: string[];
    desc: string[];
    highlight: string[];
    similar: (Similar | null)[];
    related: (Similar | null)[];
    confirmation: string[];
    cancellation: string[];
    blogs: (BlogOption | null)[];
    booking: Booking[];
    faq: FAQ[]
  }
  interface BlogOption {
    value: string;
    label: string;
  }
  interface Similar {
    value: string;
    label: string;
  }
  interface Blog {
    _id: string;
    name: string;
  }
  interface Activity {
    _id: string;
    name: string;
  }
const page = () => {
    const [actData, setActData] = useState<ActData>({
        name: '',
        coverimage: null,
        coverimagealt: '',
        coverimage2: null,
        coverimagealt2: '',
        coverimage3: null,
        coverimagealt3: '',
        coverimage4: null,
        coverimagealt4: '',
        coverimage5: null,
        coverimagealt5: '',
        coverimage6: null,
        coverimagealt6: '',
        type: 'stays',
        urllink: '',
        metatitle: '',
        metades:'',
        destination:'',
        amount: '',
        fromamount: '',
        desc:[],
        over: [],
        highlight: [],
        similar: [],
        related: [],
        confirmation:[],
        cancellation:[],
          booking:[
            {bookingname:'', duration:'',fromamount:'',amount:''}
          ],
          faq:[
            {question:'', answer:''}
          ],
          blogs:[]
      });
      const [options, setOptions] = useState([]);
      const [activityOptions, setActivityOptions] = useState([]);
      const [destOptions, setDestOptions] = useState([]);
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
  const fetchActivities = async () => {
    const response = await fetch('https://launch-api1.vercel.app/activity/stays');
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
            setActData(prevState => ({
                ...prevState,
                blogs: prevState.blogs.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
    
      const handleAddBlogSelect = () => {
        setActData(prevState => ({
          ...prevState,
          blogs: [...prevState.blogs, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveBlogSelect = (index: number) => {
        setActData(prevState => ({
          ...prevState,
          blogs: prevState.blogs.filter((_, i) => i !== index)
        }));
      };
      const handleSimilarChange = (activityOptions: Similar | null, index: number) => {
        if (activityOptions) {
            setActData(prevState => ({
                ...prevState,
                similar: prevState.similar.map((item, i) => (
                    i === index ? activityOptions : item
                ))
            }));
        }
    };
    
      const handleAddSimilarSelect = () => {
        setActData(prevState => ({
          ...prevState,
          similar: [...prevState.similar, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveSimilarSelect = (index: number) => {
        setActData(prevState => ({
          ...prevState,
          similar: prevState.similar.filter((_, i) => i !== index)
        }));
      };
      const handleRelatedChange = (activityOptions: Similar | null, index: number) => {
        if (activityOptions) {
          setActData(prevState => ({
            ...prevState,
            related: prevState.related.map((item, i) => (
              i === index ? activityOptions : item
            ))
          }));
        }
      };

  
      const handleAddRelatedSelect = () => {
        setActData(prevState => ({
          ...prevState,
          related: [...prevState.related, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveRelatedSelect = (index: number) => {
        setActData(prevState => ({
          ...prevState,
          related: prevState.related.filter((_, i) => i !== index)
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
    
      const handlebookingChange =(index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const updatedbooking = [...actData.booking];
        updatedbooking[index] = { ...updatedbooking[index], [e.target.name]: e.target.value };
        setActData({ ...actData, booking: updatedbooking });
      };
      
      const handleFaqChange =(index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        const updatedfaq = [...actData.faq];
        updatedfaq[index] = { ...updatedfaq[index], [e.target.name]: e.target.value };
        setActData({ ...actData, faq: updatedfaq});
      };


      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        setIsLoading(true);

        const formData = new FormData();
    
        // Append non-array fields to formData
        for (const [key, value] of Object.entries(actData)) {
            if (![ 'highlight', 'confirmation', 'cancellation','over','related','similar','booking','desc','blogs','faq'].includes(key)) {
              formData.append(key, value);
            }
          }
        //   for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        //   }

          actData.booking.forEach((booking, index) => {
            Object.entries(booking).forEach(([key, value]) => {
              formData.append(`booking[${index}].${key}`, value.toString());
            });
          });
          formData.append('booking', JSON.stringify(actData.booking));
        actData.faq.forEach((batch, index) => {
            formData.append(`faq[${index}].question`, batch.question);
            formData.append(`faq[${index}].answer`, batch.answer);
          });
          formData.append('faq', JSON.stringify(actData.faq));

        actData.highlight.forEach((item, index) => {
            formData.append(`highlight[${index}]`, item.trim());
          });
      
     // Assuming trekData.notincluded is an array
    //  actData.related.forEach((item, index) => {
    //     formData.append(`related[${index}]`, item.trim());
    //   });
      
      // Assuming trekData.things is an array
    //   actData.similar.forEach((item, index) => {
    //     formData.append(`similar[${index}]`, item.trim());
    //   });
      actData.over.forEach((item, index) => {
        formData.append(`over[${index}]`, item.trim());
      });
      actData.confirmation.forEach((item, index) => {
        formData.append(`confirmation[${index}]`, item.trim());
      });
      actData.cancellation.forEach((item, index) => {
        formData.append(`cancellation[${index}]`, item.trim());
      });
      actData.desc.forEach((item, index) => {
        formData.append(`desc[${index}]`, item.trim());
      });
      if (Array.isArray(actData.blogs)) {
        actData.blogs.forEach((blog, index) => {
          // Check if blog is not null and has a 'value' property
          if (blog && blog.value) {
            formData.append(`blogs[${index}]`, blog.value);
          }
        });
      }
          //   for (let [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
      if (Array.isArray(actData.similar)) {
        actData.similar.forEach((similar, index) => {
          // Check if blog is not null and has a 'value' property
          if (similar && similar.value) {
            formData.append(`similar[${index}]`, similar.value);
          }
        });
      }
      if (Array.isArray(actData.related)) {
        actData.related.forEach((related, index) => {
          // Check if blog is not null and has a 'value' property
          if (related && related.value) {
            formData.append(`related[${index}]`, related.value);
          }
        });
      }
        try {
          const response = await fetch('https://launch-api1.vercel.app/activity/createstays', {
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
      
      const addNewbooking = () => {
        setActData({
          ...actData,
          booking: [...actData.booking, {bookingname:'', duration:'',fromamount:'',amount:''}],
        });
      };
      const handleAddFaqItem = () => {
        setActData({  ...actData,
            faq: [
              ...actData.faq,
              {
           question: '', answer: '' }
        ],
              })
    
      };
    //   const handleSelectChange = (selectedOptions) => {
    //     // Update the actData state with the new array of selected options
    //     setActData(prevState => ({
    //       ...prevState,
    //       blogs: selectedOptions || [] // If nothing is selected, set to an empty array
    //     }));
    //   };
      
  return (
    <div className='flex'>
     
     <main className="flex-1">
      <div className="container mx-auto p-10 bg-white">
      <h1 className='text-5xl text-center mb-5 font-bold text-yellow-500'>Create Stays / Camping</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
  <div className='border border-gray-700 px-8 py-4 rounded-xl '> 
  <div className='text-4xl font-semibold text-gray-700 text-center mb-5'>Hero section</div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Activity Name:</label>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Repeat this block for each Cover Image and Alt Text pair */}
      
      {/* Pair 1 */}
      <div className="space-y-2 mt-5">
        <label htmlFor="coverimage" className="block text-sm font-medium text-gray-700">
          Cover Image 1:
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
          Image Alt Text 1:
        </label>
        <input
          type="text"
          id="coverimagealt"
          name="coverimagealt"
          placeholder="Image Alt text 1"
          value={actData.coverimagealt}
          onChange={handleChange}
          className=" w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>

      {/* Pair 2 */}
      <div className="space-y-2">
        <label htmlFor="coverimage2" className="block text-sm font-medium text-gray-700">
          Cover Image 2:
        </label>
        <input
          type="file"
          id="coverimage2"
          name="coverimage2"
          onChange={handleFileChange}
          className="block w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimagealt2" className="block text-sm font-medium text-gray-700 mt-[7px]">
          Image Alt Text 2:
        </label>
        <input
          type="text"
          id="coverimagealt2"
          name="coverimagealt2"
          placeholder="Image Alt text 2"
          value={actData.coverimagealt2}
          onChange={handleChange}
          className="w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimage3" className="block text-sm font-medium text-gray-700">
          Cover Image 3:
        </label>
        <input
          type="file"
          id="coverimage3"
          name="coverimage3"
          onChange={handleFileChange}
          className="block w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimagealt3" className="block text-sm font-medium text-gray-700 mt-[7px]">
          Image Alt Text 3:
        </label>
        <input
          type="text"
          id="coverimagealt3"
          name="coverimagealt3"
          placeholder="Image Alt text 3"
          value={actData.coverimagealt3}
          onChange={handleChange}
          className="w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimage4" className="block text-sm font-medium text-gray-700">
          Cover Image 4:
        </label>
        <input
          type="file"
          id="coverimage4"
          name="coverimage4"
          onChange={handleFileChange}
          className="block w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimagealt4" className="block text-sm font-medium text-gray-700 mt-[7px]">
          Image Alt Text 4:
        </label>
        <input
          type="text"
          id="coverimagealt4"
          name="coverimagealt4"
          placeholder="Image Alt text 4"
          value={actData.coverimagealt4}
          onChange={handleChange}
          className="w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimage5" className="block text-sm font-medium text-gray-700">
          Cover Image 5:
        </label>
        <input
          type="file"
          id="coverimage5"
          name="coverimage5"
          onChange={handleFileChange}
          className="block w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimagealt6" className="block text-sm font-medium text-gray-700 mt-[7px]">
          Image Alt Text 5:
        </label>
        <input
          type="text"
          id="coverimagealt5"
          name="coverimagealt5"
          placeholder="Image Alt text 5"
          value={actData.coverimagealt5}
          onChange={handleChange}
          className="w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimage3" className="block text-sm font-medium text-gray-700">
          Cover Image 6:
        </label>
        <input
          type="file"
          id="coverimage6"
          name="coverimage6"
          onChange={handleFileChange}
          className="block w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="coverimagealt6" className="block text-sm font-medium text-gray-700 mt-[7px]">
          Image Alt Text 6:
        </label>
        <input
          type="text"
          id="coverimagealt6"
          name="coverimagealt6"
          placeholder="Image Alt text 6"
          value={actData.coverimagealt6}
          onChange={handleChange}
          className="w-full py-2 px-1 border-b border-gray-300 text-gray-700 focus:outline-none"
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
  id="destination"
  name="destination"
  placeholder="Select Destination"
  className= "text-gray-700"
  value={destOptions.find((option: any) => option.value === actData.destination)}
  onChange={(selectedOption) => setActData(prevState => ({ ...prevState, destination: selectedOption ? (selectedOption as any).value : ''}))}
  options={destOptions}
  ></Select>


      </div>
 </div>
 <div className='mt-5'>
        <label htmlFor="metades" className="block text-sm font-medium text-gray-700">Meta Description</label>
        <textarea  id="metades" name="metades" placeholder="Enter the Meta Description of the page" value={actData.metades} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
      </div>
 <div className="mt-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
        <input type="number" id="amount" name="amount" placeholder="Enter amount" value={actData.amount} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700" />
      </div>
      <div>
        <label htmlFor="fromamount" className="block text-sm font-medium text-gray-700">From Amount:</label>
        <input type="number" id="fromamount" name="fromamount" placeholder="Enter from amount" value={actData.fromamount} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-700" />
      </div>
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
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Highlight Section</h3>
      {actData.highlight.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row justify-between gap-2 items-center mb-2">
          <input type='text' value={item} placeholder={`Highlight Point ${index + 1}`} onChange={(e) => handleChangeArray('highlight', index, e.target.value)} className="p-2 border-b border-gray-300 rounded w-full text-gray-700 focus:outline-none" />
          <button type="button" onClick={() => handleRemoveArrayItem('highlight', index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
        </div>
      ))}
       <div className="flex justify-center mt-2"> {/* Flex container for center alignment */}
    <button 
      type="button" 
      onClick={() => handleAddArrayItem('highlight')} 
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Add Highlight Points
    </button>
  </div>


</div>
      <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Booking Options Section</h3>
      {actData.booking.map((booking, index) => (
  <div key={index} className="border border-gray-300 shadow-md p-4 rounded my-4 w-full">
    <div className="flex flex-col gap-4 ">
      <label className="font-bold text-gray-700 text-lg mb-2">Booking Options {index + 1}</label>
      <div className='flex flex-row gap-2 '>
        <div className='flex flex-row gap-2 w-1/2 items-center'>
      <label className="font-bold text-gray-700 text-sm  ">Booking Name</label>
      <input
        type="text"
        placeholder="Enter name of the activity"
        name="bookingname"
        value={booking.bookingname}
        onChange={(e) => handlebookingChange(index, e)}
        className=" p-3 border-b border-gray-300 text-gray-700 rounded w-full"
      />
      </div>
      <div className='flex flex-row w-1/2 items-center gap-2'>
          <label className="font-bold text-gray-700 text-sm">Duration</label>
      <input
        type="text"
        placeholder="Enter Duration like 2 hour or 2 day"
        name="duration"
        value={booking.duration}
        onChange={(e) => handlebookingChange(index, e)}
        className="w-full p-3 border-b border-gray-300 rounded text-gray-700"
      />
      </div>
        </div>
        <div className="flex flex-row gap-2">
            <div className='w-1/2 flex flex-row gap-4 items-center'>
        <label className="font-bold text-sm mb-2 text-gray-700 flex-shrink-0">From Amount</label>
      <input
        type="number"
        placeholder="Enter the slash amount"
        name="fromamount"
        value={booking.fromamount}
        onChange={(e) => handlebookingChange(index, e)}
        className="w-full p-3 border border-gray-300 rounded text-gray-700"
      />
   </div>
   <div className='w-1/2 flex flex-row gap-2 items-center'>
        <label className="font-bold text-gray-700 text-sm mb-2 flex-shrink-0"> Amount</label>
        <input
          type="number"
          placeholder="Enter main amount of Booking options"
          name="amount"
          value={booking.amount}
          onChange={(e) => handlebookingChange(index, e)}
          className="w-full p-3 border border-gray-300 rounded text-gray-700"
        />
        </div>
           </div>
      </div>
   
    </div>
  
))}
<button
  type="button"
  onClick={addNewbooking}
  className="px-4 py-2 bg-yellow-500 text-white rounded  transition-colors duration-300  mt-4"
>
  Add New Booking
</button>
<div className='text-xl text-gray-700 text-center mt-5'>Add unique points for full booking section</div>
{actData.desc.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row justify-between gap-2 items-center mb-2 mt-5">
          <input type='text' value={item} placeholder={`Description Point ${index + 1}`} onChange={(e) => handleChangeArray('desc', index, e.target.value)} className="p-2 border-b border-gray-300 rounded w-full text-gray-700 focus:outline-none" />
          <button type="button" onClick={() => handleRemoveArrayItem('desc', index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
        </div>
      ))}
          <div className="flex items-center justify-center mt-2 flex-col"> 
    <button 
      type="button" 
      onClick={() => handleAddArrayItem('desc')} 
      className="w-[200px] py-2 bg-yellow-500 text-white rounded"
    >
      Add Description  Points
    </button>
  </div>
      </div>
  
      <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Policies Section </h3>
      <div className='flex flex-row gap-4'>
      <div className='w-1/2'>
      <h4 className="text-xl text-center font-semibold text-gray-700 mb-4">Confirmation Policies </h4>
      {actData.confirmation.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row justify-between gap-2 items-center mb-2">
          <input type='text' value={item} placeholder={`Confirmation Policy Point ${index + 1}`} onChange={(e) => handleChangeArray('confirmation', index, e.target.value)} className="p-2 border-b border-gray-300 rounded w-full text-gray-700 focus:outline-none" />
          <button type="button" onClick={() => handleRemoveArrayItem('confirmation', index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
        </div>
      ))}
       <div className="flex justify-center mt-2"> {/* Flex container for center alignment */}
    <button 
      type="button" 
      onClick={() => handleAddArrayItem('confirmation')} 
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Add Confirmation Policy Points
    </button>
  </div>
  </div>
  <div className='w-1/2'>
      <h4 className="text-xl text-center font-semibold text-gray-700 mb-4">Cancellation Policies </h4>
      {actData.cancellation.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row justify-between gap-2 items-center mb-2">
          <input type='text' value={item} placeholder={`Cancellation Policy Point ${index + 1}`} onChange={(e) => handleChangeArray('cancellation', index, e.target.value)} className="p-2 border-b border-gray-300 rounded w-full text-gray-700 focus:outline-none" />
          <button type="button" onClick={() => handleRemoveArrayItem('cancellation', index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
        </div>
      ))}
       <div className="flex justify-center mt-2"> {/* Flex container for center alignment */}
    <button 
      type="button" 
      onClick={() => handleAddArrayItem('cancellation')} 
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Add Cancellation Policy Points
    </button>
  </div>
  </div>
  </div>
</div>
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">FAQ Section </h3>
{actData.faq.map((faq, index) => (
  <div key={index} className="border p-4 rounded flex justify-between items-center">
    <div className="flex-1 mr-2">
      <label className="font-bold text-gray-700">Faq {index + 1}</label>
      <input
       type="text"
        name="question"
        placeholder="Enter the question"
        value={faq.question}
        onChange={(e) => handleFaqChange(index, e)}
        className="p-2 border border-gray-300 text-gray-700 rounded w-full"
      />
    </div>
    <div className="w-[450px] pt-6">
      <input
        type="text"
        placeholder="Enter the answer"
        name="answer"
        value={faq.answer}
        onChange={(e) => handleFaqChange(index, e)}
        className="p-2 border border-gray-300 text-gray-700 rounded w-full"
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
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Similar Stays / Camping Section</h3>
      {actData.similar.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(activityOptions) => handleSimilarChange(activityOptions, index)}
            options={activityOptions}
            className="flex-grow text-gray-700"
            placeholder={`Select Similar Activity #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemoveSimilarSelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddSimilarSelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add Similar Select
        </button>
   </div>
</div>
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Other Stays / Camping Section</h3>
  {actData.related.map((selectedActivity, index) => (
    <div key={index} className="flex flex-row items-center mb-2">
      <Select
        value={selectedActivity}
        onChange={(activityOptions) => handleRelatedChange(activityOptions, index)}
        options={activityOptions}
        className="flex-grow text-gray-700"
        placeholder={`Select Related Activity #${index + 1}`}
        isClearable
      />
      <button
        type="button"
        onClick={() => handleRemoveRelatedSelect(index)}
        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
      >
        Remove
      </button>
    </div>
  ))}
  <div className="flex justify-center mt-2">
    <button
      type="button"
      onClick={handleAddRelatedSelect}
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Add Related Select Activity
    </button>
  </div>
</div>

<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Blogs Section</h3>
      {actData.blogs.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(option) => handleSelectChange(option, index)}
            options={options}
            className="flex-grow text-gray-700"
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
