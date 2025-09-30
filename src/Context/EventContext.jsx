import { createContext, useState, useEffect }from 'react';
import PropTypes from "prop-types";

export const EventContext = createContext();

export const EventProvider = ({children}) => {
const [userEvents, setUserEvents] = useState({
    hosting: [],
    attending: [],
    previous: [],
});


const [searchResults, setSearchResults] = useState([]);
const [loadingUserEvents, setLoadingUserEvents] = useState(false);
const [user, setUser] = useState(null);
const [token, setToken] = useState(null);
const [loading, setIsLoading] = useState(false);
const [error, setError] = useState(null);
const [allEvents, setAllEvents] = useState([]);
const [loadingAll, setLoadingAll] = useState(false);


const [query, setQuery] = useState("");
const [filters, setFilters] = useState({
    location: "",
    category: "",
    tags: "",
    price: "",
});

// const [searchResults, setSearchResults] = useState({});

useEffect(()=> {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);   
        setUserEvents({ hosting : [], attending: [], previous: [] });
    }
}, [])
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [nearbyEvents, setNearbyEvents] = useState([]); 
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingNearby, setLoadingNearby] = useState(false); 
  
  
  const fetchUpcomingEvents = async () => {
    try {
      setLoadingUpcoming(true);
      setError(null);

      const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/upcoming`, {
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch events");

      setUpcomingEvents(Array.isArray(data.events) ? data.events : []);
    } catch (err) {
      setError(err.message);
      setUpcomingEvents([]);
    } finally {
      setLoadingUpcoming(false);
    }
  };

  const fetchNearbyEvents = async (lat, lng, radius = 25) => {
    try {
      setLoadingNearby(true);
      setError(null);

      const res = await fetch(
        `${import.meta.env.VITE_EVENT_URL}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to fetch nearby events");

      setNearbyEvents(Array.isArray(data.events) ? data.events : []);
      return data.events;
    } catch (err) {
      setError(err.message);
      setNearbyEvents([]);
      return [];
    } finally {
      setLoadingNearby(false);
    }
  };        

const fetchUsersEvents = async (type, userId) => {
    try {
        setLoadingUserEvents(true);
        setError(null);

        const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/${type}/${userId}`, {
            headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            },
        });

        const data = await res.json();
        if(!res.ok) throw new Error(data?.message || "Failed to fetch user events");

        setUserEvents((prev) => ({...prev, [type]: data.events || [] }));
        console.log(data);
        
    } catch (error) {
       setError(error.message);
       setUserEvents((prev) => ({ ...prev, [type] : [] }));
    } finally {
        setLoadingUserEvents(false);
    }
};

const fetchSearchEvents = async (query, filters = {}) => {
    try{
        const params = new URLSearchParams({ search: query, ...filters});
        const res = await fetch(`${import.meta.env.VITE_EVENT_URL}/search?${params.toString()}`, {
               headers: {
                "Content-Type" : "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const data = await res.json();
        setSearchResults(Array.isArray(data.events) ? data.events : []);
    }catch (error){
        console.log("Search error:", error);
        setSearchResults([]);
    }
};

const fetchAllEvents = async (searchQuery = "", appliedFilters = {}) => {
    try {
        setIsLoading(true);
        setError(null);
        
        let url = `${import.meta.env.VITE_EVENT_URL}/all`;

        const params = new URLSearchParams();
        if(searchQuery) params.append("query", searchQuery);
        if(appliedFilters.location) params.append("location", appliedFilters.location);
        if(appliedFilters.category) params.append("category", appliedFilters.category);
        if(appliedFilters.tags) params.append("tags", appliedFilters.tags);
        if(appliedFilters.price === "free") params.append("price", "free");
        if(appliedFilters.price === "paid") params.append("price", "paid");

        if ([...params].length > 0) {
            url = `${import.meta.env.VITE_EVENT_URL}/search?${params.toString()}`;
        }
        
        const res = await fetch(url, {headers: {"Content-Type" : "application/json"} });
        
        const data = await res.json();
        console.log(data);
        
        if (!res.ok) throw new Error(data?.message || "Failed to fetch event");

        setAllEvents(Array.isArray(data.events) ? data.events : []);
    } catch (error) {
        setAllEvents([]);
    }
    finally{
        setIsLoading(false);
    }
};

useEffect(()=>{
    fetchAllEvents(query, filters);
}, [query, filters]);

useEffect(()=> {
    if (user?._id) {
        fetchUsersEvents("hosting", user._id);
        fetchUsersEvents("attending", user._id);
        fetchUsersEvents("previous", user._id);
    }
}, [user]);


  return (
    <EventContext.Provider value={{fetchAllEvents, fetchUsersEvents, fetchSearchEvents,fetchUpcomingEvents,fetchNearbyEvents,upcomingEvents, nearbyEvents, loadingUpcoming,
        loadingNearby, searchResults, loadingUserEvents,userEvents, loadingUserEvents, searchResults, allEvents, user, token, loading, error, query, setQuery}}>
        {children}
    </EventContext.Provider>
  );
};

EventProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
