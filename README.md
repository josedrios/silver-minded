# Silver Minded

Silver Minded helps track and organize all the different facets of your life, bringing everything together into one central place to de-clutter your mind. The main goal of this application was to solve the problem of an overwhelmed mind to encourage growth and improvement within your life.

The application is broken down into four main concepts: tasks, events, transactions, and trees. The tasks list in the Dash page is for high priority or quick, executable tasks. The events in the Time page are meant to help organize your plans and overall time. In the Bank page, one's transactions are tracked and broken down into categories for improved insight on spending. Lastly is the tree concept, which are documents that you can make in the Mind page to hold any sort of information.

## Features

Silver Minded offers very straight forward tools to track and organize your life:

- **Dashboard:** Task list with different forms of filtering/sorting.
- **Calendar:** Event tracker, both in a list and calendar UI.
- **Finance Tracker:** Financial budget tracker, giving insight on what categories your transactions are being allocated to.
- **Blocknote Powered Documents:** Create documents (known as trees within the application), storing thoughts, project lists, ideas and so much more. Serves as a way to take the load off your mind and store it for later.

# Installation

This guide will show you how to set up and get the application running locally.

## Prerequisites

Ensure you have the following installed on your system before beginning:

- Node.js: [Download from Official Wesbite](https://nodejs.org)
- npm: Should come with Node.js
- PM2: Will be used to manage the backend process. Install this globally:

```
npm install -g pm2
# if you use Yarn do this instead:
# yarn global add pm2
```

### 1. Clone the repository

Clone the repository on your local machine and then move into its directory:

```
git clone https://github.com/josedrios/silver-minded.git
cd silver-minded
```

### 2. Set up the backend

The backend will make sure your application can communicate with your database.

#### 2.1 Download Dependencies

First move into the backend directory and install the backend dependencies:

```
cd backend
npm install
# if you use Yarn do this instead:
# yarn install
```

#### 2.2 Setup Database

*WIP*

#### 2.2 Setup .ENV File

*WIP*

#### 2.3 Start the Backend with PM2

PM2 will keep your backend running in the background, will in the backend directory run this command:

```
pm2 start server.js --name "SilverMinded-Backend"
```

You can verify that your backend process is running properly by executing this command:

```
pm2 list
```

If it is not running properly, you can check the logs of the backend process:

```
pm2 logs backend
```

**OPTIONAL:** To let your backend automatically restart if your system reboots do the following:

```
pm2 save
pm2 startup
```

### 3. Frontend Setup (Electron)

The frontend for Silver Minded is an Electron desktop application.

#### 3.1 Download Dependencies

First move into the frontend directory and install the frontend dependencies:
```
cd ../frontend
# If you are in the root directory do:
# cd frontend

npm install 
# if you use Yarn do this instead:
# yarn install
```

#### 3.2 Setup .ENV

*WIP*

#### 3.3 Build the Frontend for Electron
```
npm build
# or 
# yarn build
```

#### 3.4 Create the Electron Application
```
npm run package
```

### 4. Access the application

## Learned
*WIP*

## Challenges
*WIP*

## Plan to Add
*WIP*