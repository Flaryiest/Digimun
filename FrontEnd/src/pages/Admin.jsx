import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton, Select, MenuItem} from '@mui/material'
import { styled } from '@mui/system'
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    marginTop: '10dvh',
  }));
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    padding: theme.spacing(1),
    fontSize: '14px',
  }));
  
  const StyledSwitch = styled(Switch)(({ theme }) => ({
    transform: 'scale(0.8)',
    transitionDuration: '50ms',
  }));


function Admin() {
    const params = useParams()
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countriesInCommittee, setCountriesInCommittee] = useState([])
    const [rerender, triggerRender] = useState(0)
    useEffect(() => {
        getCountryList()
    }, [])

    useEffect(() => {
        getCountriesInCommittee()
    }, [rerender])

    async function getCountryList() {
        const response = await fetch("http://localhost:3000/api/countries", {
            method: "GET",
            credentials: 'include',
        })
        const countries = await response.json()
        console.log(countries)
        setCountries(countries)
    }

    async function getCountriesInCommittee() {
        const response = await fetch("http://localhost:3000/api/committee", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
        const committee = await response.json()
        const profilesWithCountry = committee.profiles.filter((profile) => profile.country != null) /// change clause
        console.log(committee.profiles)
        console.log(profilesWithCountry)
        setCountriesInCommittee(profilesWithCountry)
    }

    async function addCountryToCommittee(country) {
        const response = await fetch("http://localhost:3000/api/committee/countries", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID, country: country})
        })
    }

    async function changePresentStatus(country) {
        const response = await fetch("http://localhost:3000/api/committee/countries/present", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID, country: country})
        })
    }

    async function changeVotingStatus(country) {
        const response = await fetch("http://localhost:3000/api/committee/countries/voting", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID, country: country})
        })
    }

    async function removeCountryFromCommittee() {
        const response = await fetch("http://localhost:3000/api/committee/countries/remove", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
    }

    
    const handleToggle = (index, field) => (event) => {
        //const updatedCountries = [...countries];
        //updatedCountries[index][field] = event.target.checked;
        //setCountriesInCommittee(updatedCountries)
    }
    
    const handleDelete = (index) => () => {
        const updatedCountries = countries.filter((_, i) => i !== index);
        setCountriesInCommittee(updatedCountries)
    }

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    }

    const handleAddCountry = async (row) => {
        console.log(row.country)
        const response = await fetch("http://localhost:3000/api/committee/countries/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID, country: row.country})
        })
        if (response.status == 200) {
            console.log(rerender)
            triggerRender(prevState => prevState + 1)
        }
        else {
            console.log("add country failed")
        }
    }
    
      return (
        <StyledTableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>
                            <Select
                                value={selectedCountry}
                                displayEmpty
                                fullWidth
                                size="small"
                                MenuProps={{ 
                                    disablePortal: true,
                                    PaperProps: { 
                                        style: { 
                                            maxHeight: 300,
                                            maxWidth: 200,
                                            fontSize: '14px',
                                            transition: 'transform 0.01s ease-in-out'
                                        } 
                                    },
                                    transitionDuration: 10
                                }}
                                sx={{ fontSize: '12px', padding: '4px' }}
                            >
                                <MenuItem value="">All Countries</MenuItem>
                                {countries.map((row, index) => (
                                    <MenuItem key={index} value={[row.country, row.countryCode]} onClick={() => handleAddCountry(row)}>
                                        {row.country}
                                    </MenuItem>
                                ))}
                            </Select>
                        </StyledTableCell>
                        <StyledTableCell>Present</StyledTableCell>
                        <StyledTableCell>Voting</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {countriesInCommittee.map((row, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{row.country}</StyledTableCell>
                            <StyledTableCell>
                                <StyledSwitch
                                    checked={Boolean(row.present)}
                                    onChange={handleToggle(index, 'present')}
                                    color="primary"
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <StyledSwitch
                                    checked={Boolean(row.voting)}
                                    onChange={handleToggle(index, 'voting')}
                                    color="primary"
                                />
                            </StyledTableCell>
                            <StyledTableCell>
                                <IconButton onClick={handleDelete(index)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
      )
}

export default Admin