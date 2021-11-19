import { makeStyles } from "@mui/styles"
import React from "react"
import Typography from "@mui/material/Typography"
import Drawer from "@mui/material/Drawer"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { AddCircleOutlined, SubjectOutlined } from "@mui/icons-material"
import { useHistory, useLocation } from "react-router-dom"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import {format} from "date-fns"
import Avatar from "@mui/material/Avatar"
import { StyledEngineProvider } from "@mui/material"

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
    page: {
        background: '#f9f9f9',
        width: '100%',
        padding: theme.spacing(3)
    },
    drawer: {
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    root: {
        display: 'flex'
    },
    active: {
        background: '#f4f4f4'
    },
    title: {
        padding: theme.spacing(2)
    },
    appbar: {
        width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
        flexGrow: 1
    },
    avatar: {
        marginLeft: theme.spacing(2)
    }
}
})

export default function Layout({children}) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const menuItems = [
        {
            text: "My Notes", 
            icon: <SubjectOutlined color="secondary"/>,
            path: '/'
        },
        {
            text: "Create Note",
            icon: <AddCircleOutlined color="secondary"/>,
            path: '/create'
        }
    ]
    return (
        <StyledEngineProvider injectFirst>
        <div className={classes.root}>
            {/* app bar */}

            <AppBar 
                className={classes.appbar}
                // sx={{width: `calc(100% - ${drawerWidth}px)`}}
                elevation={0}>
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Mario
                    </Typography>
                    <Avatar src="/mario-av.png" className={classes.avatar} />
                </Toolbar>
            </AppBar>

            {/* side drawer */}

            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper}}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Ninja Notes
                    </Typography>
                </div>

                {/* list / links */}

                <List>
                    {menuItems.map(item => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path && classes.active}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}

                </List>

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
        </StyledEngineProvider>
    )
}