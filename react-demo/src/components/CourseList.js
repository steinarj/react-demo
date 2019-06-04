import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import * as contentful from 'contentful'
import Course from '../components/Course'
const SPACE_ID = '4pmdthl82s0k'
const ACCESS_TOKEN = '56O4RVncdTvZv7esHJc7zoqqr1X4-DwCAZ_3U8-1PfU'
const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
})
class CoursesList extends Component {
    state = {
        courses: [],
        searchString: ''
    }
    constructor() {
        super()
        this.getCourses()
    }
    getCourses = () => {
        client.getEntries({
            content_type: 'courses',
            query: this.state.searchString
        })
            .then((response) => {
                this.setState({courses: response.items})
                console.log(this.state.courses)
            })
            .catch((error) => {
                console.log("Error occurred while fetching Entries")
                console.error(error)
            })
    }
    onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({searchString: event.target.value})
        } else {
            this.setState({searchString: ''})
        }
        this.getCourses()
    }
    render() {
        return (
            <div>
                { this.state.courses ? (
                    <div>
                        <TextField style={{padding: 10}}
                                   id="searchInput"
                                   placeholder="Search for Courses"
                                   margin="normal"
                                   onChange={this.onSearchInputChange}
                                    />
                        <Grid container spacing={10} style={{padding: 24}}>
                            { this.state.courses.map(currentCourse => (
                                <Grid key={currentCourse} item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found" }
            </div>
        )
    }
}
export default CoursesList;