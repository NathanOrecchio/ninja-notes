import React, { useState } from 'react'
import { makeStyles } from "@mui/styles"
import Typography from "@mui/material/Typography"
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Radio from '@mui/material/Radio'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import TextField from '@mui/material/TextField'
import { FormControlLabel, RadioGroup } from '@mui/material'
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block"
  }
})

export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCatergory] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title == '') {
      setTitleError(true)
    }
    if (details == '') {
      setDetailsError(true)
    }
    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details, category})
      }).then(() => history.push('/'))
    }
  }

  return (
    <Container>
      <Typography
        variant="h6"  
        component="h2" 
        color="textSecondary"   
        gutterBottom
      >
        Create a New Note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => setTitle(e.target.value)}
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />

        <TextField
          onChange={(e) => setDetails(e.target.value)}
          className={classes.field}
          label="Note Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCatergory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money"/>
            <FormControlLabel value="todos" control={<Radio />} label="Todo"/>
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders"/>
            <FormControlLabel value="work" control={<Radio />} label="Work"/>
          </RadioGroup>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="secondary"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Submit
        </Button>

      </form>

    </Container>
  )
}
