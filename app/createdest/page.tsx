'use client'
import React, { ChangeEvent,useState,useEffect } from 'react';
import Select from 'react-select';
import { uploadFileToS3 } from "../aws"
import Sidebar from '@/Components/Sidebar/Sidebar'

  interface activity {
    value: string;
    label: string;
  }
  interface destination  {
    _id: string;
    name: string;
  }
  interface camping {
    value: string;
    label: string;
  }
  interface Activity {
    _id: string;
    name: string;
  }
  interface Tourproducts {
    value: string;
    label: string;
  }
  interface food {
    _id: string;
    name: string;
  }
  interface stay {
    _id: string;
    name: string;
  }
  interface culture {
    _id: string;
    name: string;
  }
  interface religious {
    _id: string;
    name: string;
  }
  interface Blog {
    _id: string;
    name: string;
  }
  interface AttData {
    name: string;
    coverimage: File | null;
    coverimagealt: string;
    urllink: string;
    metatitle: string;
    metades:string;
    attpara:string;
    actpara:string;
    staypara:string;
    camppara:string;
    religpara: string;
    desttype:string;
    title:string;
    visit:string;
    duration:string;
    over: string[];
    attraction: (Attraction | null)[];
    products: (products | null)[];
    tourproducts: (Tourproducts | null)[];
    shopping:(Shopping | null)[];
    blogs: (BlogOption | null)[];
    activity:(activity | null)[];
    camping:(camping | null)[];
    culture:(Culture | null)[];
    religious:(Religious | null)[];
    destination:(Destination  | null)[];
    stay: (Stay | null)[];
    food:(food | null)[];
    maintype: string;
    location: string; // Added for blog type selection
  }
  interface BlogOption {
    value: string;
    label: string;
  }
  interface Stay {
    value: string;
    label: string;
  }
  interface Religious {
    value: string;
    label: string;
  }
  interface Shopping {
    value: string;
    label: string;
  }
  interface Culture {
    value: string;
    label: string;
  }
  interface Destination {
    value: string;
    label: string;
  }
  interface Attraction {
    value: string;
    label: string;
  }
  interface products {
    value: string;
    label: string;
  }
  interface Blog {
    _id: string;
    name: string;
  }
  interface Attraction {
    _id: string;
    name: string;
  }
  interface Dest {
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
  interface shopping {
    _id: string;
    name: string;
  }
const page = () => {
    const [AttData, setAttData] = useState<AttData>({
        name: '',
        title:'',
        coverimage: null,
        coverimagealt: '',
        urllink: '',
        metatitle: '',
        metades:'',
        attpara:'',
        actpara:'',
        camppara:'',
        staypara:'',
        desttype:'',
        religpara:'',
        visit:'',
        duration:'',
        over: [],
        religious:[],
        tourproducts: [],
        products: [],
        attraction: [],
        activity: [],
        camping:[],
        shopping:[],
        stay:[],
        culture:[],
          blogs:[],
          destination: [],
          food:[],
          maintype: '',
          location: '', // Initialize AttractionType
      });
      const [options, setOptions] = useState([]);
      const [trekOptions, settrekOptions] = useState([]);
      const [tourOptions, settourOptions] = useState([]);
      const [treksOptions, settreksOptions] = useState([]);
      const [destOptions, setDestOptions] = useState([]);
      const [activityOptions, setActivityOptions] = useState([]);
      const [stayOptions, setStayOptions] = useState([]);
      const [AttractionTypeOptions, setAttractionTypeOptions] = useState([
        { value: 'southindia', label: 'South India' },
        { value: 'northindia', label: 'North India' },
        { value: 'international', label: 'International' },
        
        // Add more blog types as needed
      ]);
      const [locationOptions, setLocationOptions] = useState([
        { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
        { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
        { value: 'Assam', label: 'Assam' },
        { value: 'Bihar', label: 'Bihar' },
        { value: 'Chhattisgarh', label: 'Chhattisgarh' },
        { value: 'Goa', label: 'Goa' },
        { value: 'Gujarat', label: 'Gujarat' },
        { value: 'Haryana', label: 'Haryana' },
        { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
        { value: 'Jharkhand', label: 'Jharkhand' },
        { value: 'Karnataka', label: 'Karnataka' },
        { value: 'Kerala', label: 'Kerala' },
        { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
        { value: 'Maharashtra', label: 'Maharashtra' },
        { value: 'Manipur', label: 'Manipur' },
        { value: 'Meghalaya', label: 'Meghalaya' },
        { value: 'Mizoram', label: 'Mizoram' },
        { value: 'Nagaland', label: 'Nagaland' },
        { value: 'Odisha', label: 'Odisha' },
        { value: 'Punjab', label: 'Punjab' },
        { value: 'Rajasthan', label: 'Rajasthan' },
        { value: 'Sikkim', label: 'Sikkim' },
        { value: 'Tamil Nadu', label: 'Tamil Nadu' },
        { value: 'Telangana', label: 'Telangana' },
        { value: 'Tripura', label: 'Tripura' },
        { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
        { value: 'Uttarakhand', label: 'Uttarakhand' },
        { value: 'West Bengal', label: 'West Bengal' },
        // Union Territories
        { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
        { value: 'Chandigarh', label: 'Chandigarh' },
        { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
        { value: 'Lakshadweep', label: 'Lakshadweep' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Puducherry', label: 'Puducherry' },
        { value: 'Ladakh', label: 'Ladakh' },
        { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
      ]);
      


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
    const fetchStay = async () => {
      const response = await fetch('https://launch-api1.vercel.app/activity/stays');
      const data = await response.json();
      const formattedOptions = data.data.map((activity: Activity) => ({
        value: activity._id,
        label: activity.name
      }));
      setStayOptions(formattedOptions);
    };
    
    fetchStay();
  }, []);
  useEffect(() => {
    const fetchtrek = async () => {
      const response = await fetch('https://launch-api1.vercel.app/attraction');
      const data = await response.json();
      const formattedOptions = data.data.map((trek:Blog) => ({
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
        value: dest._id,
        label: dest.name
      }));
      setDestOptions(formattedOptions);
    };
    
    fetchDest();
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('https://launch-api1.vercel.app/activity/activity');
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
    const fetchtrek = async () => {
      const response = await fetch('https://launch-api1.vercel.app/trek/trekfull');
      const data = await response.json();
      const formattedOptions = data.map((trek:trek) => ({
        value: trek._id,
        label: trek.name
      }));
      settreksOptions(formattedOptions);
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
  // Handler for when an option is selected
      const [isLoading, setIsLoading] = useState<boolean>(false);
      const handleMainChange = (selectedOption: BlogOption | null) => {
        if (selectedOption) {
          setAttData(prevState => ({
            ...prevState,
            maintype: selectedOption.value
          }));
        }
      };
      const handleLocationChange = (selectedOption: BlogOption | null) => {
        if (selectedOption) {
          setAttData(prevState => ({
            ...prevState,
            location: selectedOption.value
          }));
        }
      };
      const handledestinationSelectChange = (selectedOption: Destination | null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                destination: prevState.destination.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
      const handleAdddestinationSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          destination: [...prevState.destination, null] // It's now valid to add null because of the updated type
        }));
      };
      const handleRemovedestinationSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          destination: prevState.destination.filter((_, i) => i !== index)
        }));
      };
      const handlereligiousSelectChange = (selectedOption: Religious| null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                religious: prevState.religious.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
      const handleAddreligiousSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          religious: [...prevState.religious, null] // It's now valid to add null because of the updated type
        }));
      };
      const handleRemovereligiousSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          religious: prevState.religious.filter((_, i) => i !== index)
        }));
      };
      const handlecultureSelectChange = (selectedOption: Culture | null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                culture: prevState.culture.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
      const handleAddcultureSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          culture: [...prevState.culture, null] // It's now valid to add null because of the updated type
        }));
      };
      const handleRemovecultureSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          culture: prevState.culture.filter((_, i) => i !== index)
        }));
      };
      const handleshoppingSelectChange = (selectedOption: Shopping | null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                shopping: prevState.shopping.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
      const handleAddshoppingSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          shopping: [...prevState.shopping, null] // It's now valid to add null because of the updated type
        }));
      };
      const handleRemoveshoppingSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          shopping: prevState.shopping.filter((_, i) => i !== index)
        }));
      };

      const handleSelectBlogChange = (selectedOption: BlogOption | null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                blogs: prevState.blogs.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
    
      const handleAddBlogSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          blogs: [...prevState.blogs, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveBlogSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          blogs: prevState.blogs.filter((_, i) => i !== index)
        }));
      };
      const handleSelectCampChange = (selectedOption: BlogOption | null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                camping: prevState.camping.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
    
      const handleAddCampSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          camping: [...prevState.camping, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveCampSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          camping: prevState.camping.filter((_, i) => i !== index)
        }));
      };
      const handleTourproductsChange = (activityOptions: Tourproducts | null, index: number) => {
        if (activityOptions) {
            setAttData(prevState => ({
                ...prevState,
                tourproducts: prevState.tourproducts.map((item, i) => (
                    i === index ? activityOptions : item
                ))
            }));
        }
    };
    
      const handleAddTourproductsSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          tourproducts: [...prevState.tourproducts, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveTourproductsSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          tourproducts: prevState.tourproducts.filter((_, i) => i !== index)
        }));
      };
      const handleProductsChange = (activityOptions: products | null, index: number) => {
        if (activityOptions) {
          setAttData(prevState => ({
            ...prevState,
            products: prevState.products.map((item, i) => (
              i === index ? activityOptions : item
            ))
          }));
        }
      };
  
      const handleAddProductsSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          products: [...prevState.products, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveProductsSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          products: prevState.products.filter((_, i) => i !== index)
        }));
      };
      const handlefoodSelectChange = (selectedOption: food | null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                food: prevState.food.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
    
      const handleAddfoodSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          food: [...prevState.food, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemovefoodSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          food: prevState.food.filter((_, i) => i !== index)
        }));
      };

      const handleStayChange = (selectedOption: Stay | null, index: number) => {
        if (selectedOption) {
            setAttData(prevState => ({
                ...prevState,
                stay: prevState.stay.map((item, i) => (
                    i === index ? selectedOption : item
                ))
            }));
        }
    };
    
      const handleAddStaySelect = () => {
        setAttData(prevState => ({
          ...prevState,
          stay: [...prevState.stay, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveStaySelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          stay: prevState.stay.filter((_, i) => i !== index)
        }));
      };

      const handleAttractionChange = (activityOptions: Attraction | null, index: number) => {
        if (activityOptions) {
            setAttData(prevState => ({
                ...prevState,
                attraction: prevState.attraction.map((item, i) => (
                    i === index ? activityOptions : item
                ))
            }));
        }
    };
    
    const handleAddAttractionSelect = () => {
        setAttData(prevState => ({
          ...prevState,
          attraction: [...prevState.attraction, null] // It's now valid to add null because of the updated type
        }));
      };
      
      const handleRemoveAttractionSelect = (index: number) => {
        setAttData(prevState => ({
          ...prevState,
          attraction: prevState.attraction.filter((_, i) => i !== index)
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
      
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        setIsLoading(true);

        const formData = new FormData();
    
        // Append non-array fields to formData
        for (const [key, value] of Object.entries(AttData)) {
            if (!['over','attraction','activity','stay','religious','camping', 'food','culture','shopping','products','tourproducts','blogs','destination',].includes(key)) {
              formData.append(key, value);
            }
          }

      AttData.over.forEach((item, index) => {
        formData.append(`over[${index}]`, item.trim());
      });

      if (Array.isArray(AttData.blogs)) {
        AttData.blogs.forEach((blog, index) => {
          // Check if blog is not null and has a 'value' property
          if (blog && blog.value) {
            formData.append(`blogs[${index}]`, blog.value);
          }
        });
      }
      
      if (Array.isArray(AttData.destination)) {
        AttData.destination.forEach((destination, index) => {
          // Check if blog is not null and has a 'value' property
          if (destination && destination.value) {
            formData.append(`destination[${index}]`, destination.value);
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
      if (Array.isArray(AttData.products)) {
        AttData.products.forEach((products, index) => {
          // Check if blog is not null and has a 'value' property
          if (products && products.value) {
            formData.append(`products[${index}]`, products.value);
          }
        });
      }
      if (Array.isArray(AttData.tourproducts)) {
        AttData.tourproducts.forEach((tourproducts, index) => {
          // Check if blog is not null and has a 'value' property
          if (tourproducts && tourproducts.value) {
            formData.append(`tourproducts[${index}]`, tourproducts.value);
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
       
      if (Array.isArray(AttData.religious)) {
        AttData.religious.forEach((religious, index) => {
          // Check if blog is not null and has a 'value' property
          if (religious && religious.value) {
            formData.append(`religious[${index}]`, religious.value);
          }
        });
      }
                  
      if (Array.isArray(AttData.camping)) {
        AttData.camping.forEach((camping, index) => {
          // Check if blog is not null and has a 'value' property
          if (camping && camping.value) {
            formData.append(`camping[${index}]`, camping.value);
          }
        });
      }   
      if (Array.isArray(AttData.food)) {
        AttData.camping.forEach((food, index) => {
          // Check if blog is not null and has a 'value' property
          if (food && food.value) {
            formData.append(`food[${index}]`, food.value);
          }
        });
      }  
      if (Array.isArray(AttData.culture)) {
        AttData.culture.forEach((culture, index) => {
          // Check if blog is not null and has a 'value' property
          if (culture && culture.value) {
            formData.append(`culture[${index}]`, culture.value);
          }
        });
      } 
      if (Array.isArray(AttData.shopping)) {
        AttData.shopping.forEach((shopping, index) => {
          // Check if blog is not null and has a 'value' property
          if (shopping && shopping.value) {
            formData.append(`shopping[${index}]`, shopping.value);
          }
        });
      } 
    if (Array.isArray(AttData.stay)) {
      AttData.stay.forEach((stays, index) => {
        // Check if blog is not null and has a 'value' property
        if (stays && stays.value) {
          formData.append(`stay[${index}]`, stays.value);
        }
      });
    }
        try {
          const response = await fetch('https://launch-api1.vercel.app/dest/createdesta', {
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
   <h1 className='text-5xl text-center mb-5 font-bold text-yellow-500'>Create Destination</h1>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      
 </div>
 
 <div >
              <label  htmlFor="AttractionType" className="block text-sm font-medium text-gray-700 ">Attraction Place</label>
              <Select  
                className="text-black"              
                id="AttractionType"
                name="AttractionType"
                placeholder="Select Attraction Place"
                // value={AttractionTypeOptions.find(option => option.value === AttData.maintype)}
                // onChange={(selectedOption) => handleSelectChange(selectedOption, 'maintype')}
                value={AttractionTypeOptions.find(option => option.value === AttData.maintype)}
                onChange={handleMainChange}
                options={AttractionTypeOptions}
              />
            </div>
</div>
 <div className='mt-5'>
        <label htmlFor="metades" className="block text-sm font-medium text-gray-700">Meta Description</label>
        <textarea  id="metades" name="metades" placeholder="Enter the Meta Description of the page" value={AttData.metades} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
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
   
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
        {/* reach input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">H2 Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={AttData.title}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="Enter H2 Title"
          />
        </div>
        {/* Label input */}
        <div>
          <label htmlFor="desttype" className="block text-sm font-medium text-gray-700">Destination Type:</label>
          <input
            type="text"
            id="desttype"
            name="desttype"
            value={AttData.desttype}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="Destination type"
          />
        </div>
        {/* Timings input */}
        <div>
          <label htmlFor="visit" className="block text-sm font-medium text-gray-700">Best time to visit:</label>
          <input
            type="text"
            id="visit"
            name="visit"
            value={AttData.visit}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="Best time to visit"
          />
        </div>
        {/* Time Required input */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Ideal duration:</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={AttData.duration}
            onChange={handleChange}
            className="block w-full border-b border-gray-300 py-2 px-1 text-gray-700 focus:outline-none"
            placeholder="Ideal duration"
          />
        </div>

        <div >
              <label  htmlFor="location" className="block text-sm font-medium text-gray-700 ">Location Place</label>
              <Select  
                className="text-black"              
                id="location"
                name="location"
                placeholder="Select Location Place"
                value={locationOptions.find(option => option.value === AttData.location)}
                onChange={handleLocationChange}
                options={locationOptions}
              />
            </div>

      </div>
    

</div>
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Similar Tour Section</h3>
      {AttData.tourproducts.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(activityOptions) => handleTourproductsChange(activityOptions, index)}
            options={tourOptions}
            className="flex-grow text-gray-700"
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
  {AttData.products.map((selectedActivity, index) => (
    <div key={index} className="flex flex-row items-center mb-2">
      <Select
        value={selectedActivity}
        onChange={(treksOptions) => handleProductsChange(treksOptions, index)}
        options={treksOptions}
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
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Attraction Section {AttData.name} </h3>
  
  <div className='mt-5 mb-5'>
        <label htmlFor="attpara" className="block text-sm font-medium text-gray-700">Attraction Paragraph</label>
        <textarea  id="attpara" name="attpara" placeholder="Enter the Attraction Paragraph" value={AttData.attpara} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
      </div>
  
  {AttData.attraction.map((selectedActivity, index) => (
    <div key={index} className="flex flex-row items-center mb-2">
      <Select
        value={selectedActivity}
        onChange={(trekOptions) => handleAttractionChange(trekOptions, index)}
        options={trekOptions}
        className="flex-grow text-black"
        placeholder={`Select Products Activity #${index + 1}`}
        isClearable
      />
      <button
        type="button"
        onClick={() => handleRemoveAttractionSelect(index)}
        className="bg-red-500 text-white px-2 py-1 rounded ml-2"
      >
        Remove
      </button>
    </div>
  ))}
  <div className="flex justify-center mt-2">
    <button
      type="button"
      onClick={handleAddAttractionSelect}
      className="px-4 py-2 bg-yellow-500 text-white rounded"
    >
      Add Attraction
    </button>
  </div>
</div>

<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Activities Section {AttData.name} </h3>
  
  <div className='mt-5 mb-5'>
        <label htmlFor="actpara" className="block text-sm font-medium text-gray-700">Activities Paragraph</label>
        <textarea  id="actpara" name="actpara" placeholder="Enter the Activities Paragraph" value={AttData.actpara} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
      </div>
  
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
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Food Section {AttData.name}</h3>
      {AttData.food.map((selectedfood, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedfood}
            onChange={(option) => handlefoodSelectChange(option, index)}
            options={options}
            className="flex-grow text-black"
            placeholder={`Select food #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemovefoodSelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddfoodSelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add food Select
        </button>
      </div>
    </div>

    <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Stay Section {AttData.name} </h3>
  
  <div className='mt-5 mb-5'>
        <label htmlFor="staypara" className="block text-sm font-medium text-gray-700">Stay Paragraph</label>
        <textarea  id="staypara" name="staypara" placeholder="Enter the Stay Paragraph" value={AttData.staypara} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
      </div>
      {AttData.stay.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(stayOptions) => handleStayChange(stayOptions, index)}
            options={stayOptions}
            className="flex-grow text-black"
            placeholder={`Select Similar Stay #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemoveStaySelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddStaySelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add Similar Select
        </button>
    
    </div>

</div>
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Shopping Section {AttData.name}</h3>
      {AttData.shopping.map((selectedshopping, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedshopping}
            onChange={(option) => handleshoppingSelectChange(option, index)}
            options={options}
            className="flex-grow text-black"
            placeholder={`Select shopping #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemoveshoppingSelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddshoppingSelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add Shopping Select
        </button>
      </div>
    </div>
    <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Culture Section {AttData.name}</h3>
      {AttData.culture.map((selectedculture, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedculture}
            onChange={(options) => handlecultureSelectChange(options, index)}
            options={options}
            className="flex-grow text-black"
            placeholder={`Select shopping #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemovecultureSelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddcultureSelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add culture Select
        </button>
      </div>
    </div>
    <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Religious Section {AttData.name} </h3>
  <div className='mt-5 mb-5'>
        <label htmlFor="religpara" className="block text-sm font-medium text-gray-700">Religious Paragraph</label>
        <textarea  id="religpara" name="religpara" placeholder="Enter the Religious Paragraph" value={AttData.religpara} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
      </div>
      {AttData.religious.map((selectedreligious, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedreligious}
            onChange={(trekOptions) => handlereligiousSelectChange(trekOptions, index)}
            options={trekOptions}
            className="flex-grow text-black"
            placeholder={`Select Similar religious #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemovereligiousSelect (index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddreligiousSelect }
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add religious Select
        </button>
   </div>
</div>
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
  <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Camping Section {AttData.name} </h3>
  
  <div className='mt-5 mb-5'>
        <label htmlFor="camppara" className="block text-sm font-medium text-gray-700">Stay Paragraph</label>
        <textarea  id="camppara" name="camppara" placeholder="Enter the Camping Paragraph" value={AttData.camppara} onChange={handleChange} className="block w-full border-b border-gray-300 rounded-md shadow-sm py-2 px-1 text-gray-700 focus:outline-none" />
      </div>
      {AttData.camping.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(stayOptions) => handleSelectCampChange(stayOptions, index)}
            options={stayOptions}
            className="flex-grow text-black"
            placeholder={`Select Similar Stay #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemoveCampSelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAddCampSelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add Similar Select
        </button>
    
    </div>

</div>
<div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Blog Section {AttData.name}</h3>
      {AttData.blogs.map((selectedBlog, index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selectedBlog}
            onChange={(option) => handleSelectBlogChange(option, index)}
            options={options}
            className="flex-grow text-black"
            placeholder={`Select shopping #${index + 1}`}
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
    <div className='w-full px-8 pt-6 pb-8 border border-gray-700 rounded-xl'>
      <h3 className="text-4xl text-center font-semibold text-gray-700 mb-4">Destination  Section {AttData.name}</h3>
      {AttData.destination .map((selecteddestination , index) => (
        <div key={index} className="flex flex-row items-center mb-2">
          <Select
            value={selecteddestination }
            onChange={(destOptions) => handledestinationSelectChange(destOptions, index)}
            options={destOptions}
            className="flex-grow text-black"
            placeholder={`Select destination #${index + 1}`}
            isClearable
          />
          <button
            type="button"
            onClick={() => handleRemovedestinationSelect(index)}
            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="flex justify-center mt-2">
        <button
          type="button"
          onClick={handleAdddestinationSelect}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Add destination  Select
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

