import React, { useState, useContext, useEffect } from "react";
import FirebaseContext from '../../firebase/context';
import LinkItem from "./LinkItem";

function SearchLinks() {
  const { firebase } = useContext(FirebaseContext)
  const [links, setLinks] = useState([])
  const [filter, setFilter] = useState("")
  const [filteredLinks, setFilteredLinks] = useState([])

  useEffect(() => {
    getInitialLinks()
  }, [])

  function getInitialLinks() {
    firebase.db
    .collection('links')
    .get()
    .then(snapshot => {
      const links = snapshot.docs.map(doc => {
         return { id: doc.id, ...doc.data() }
      })
      setLinks(links)
    })
  }

  function handleSearch(event) {
    event.preventDefault();
    const query = filter.toLowerCase()
    const matchedLinks = links.filter(link => {
      return (
        link.description.toLowerCase().includes(query) ||
        link.url.toLowerCase().includes(query) ||
        link.postedBy.name.toLowerCase().includes(query)
      );
    });
    setFilteredLinks(matchedLinks)
  }

  return (
    <div>
    <form onSubmit={handleSearch}>
    Search <input onChange={event => setFilter(event.target.value)} />
    <button>OK</button> 
    </form>
    {filteredLinks.map((filteredLink, index) => (
      <LinkItem key={filteredLink.id} showCount={false} link={filteredLink} index={index}/>
    ))}
    </div>
  );
}

export default SearchLinks;
