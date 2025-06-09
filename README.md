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
- MongoDB: [Download from Official Website](https://www.mongodb.com/) (The database that will be used by this application)
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

#### 2.2 Setup .ENV File

Set up the .ENV file for your backend. When it comes to the ports being utilized I chose 4000 for the backend and 4001 for the frontend:
```
PORT=4000
MONGO_URL=mongodb://localhost:27017/silver-minded
FRONTEND_URL=http://localhost:4001
```

#### 2.3 Start the Backend with PM2

PM2 will keep your backend running in the background. While in the backend directory, we will now run the backend itself through PM2:

```
pm2 start server.js --name "SilverMinded-Backend"
```

You can verify that your backend process is running properly by executing this command:

```
pm2 list
```

You should see a process called 'SilverMinded-Backend' running in you list, if it is not running properly you can check the logs of the backend process:

```
pm2 logs SilverMinded-Backend
```

**OPTIONAL:** To let your backend automatically restart if your system reboots do the following:

```
pm2 startup
pm2 save
```

The PM2 save command saves you list of processes so on boot, they can be restored as intended.

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

Set up the .ENV file for your frontend:

```
VITE_BACKEND_URL=http://localhost:4000
```

#### 3.3 Build the Frontend for Electron

```
npm build
# or
# yarn build
```

#### 3.4 Create the Electron Application

Go back to the root directory:
```
cd ..
```

Download the dependencies needed for electron:
```
npm install
```

Now run the following to package your application:

For macOS:
```
npm run package:mac
```
You will find you application in SilverMinded-darwin-x64

For Windows:
```
npm run package:win
```
You will find you application in SilverMinded-win32-x64

For Linux:
```
npm run package:linux
```
You will find you application in SilverMinded-linux-x64

## Learned

- Better file structure when it comes to dividing frontend and backend as well a better file structure specifically in the frontend to promote clean, reusable code usage
- An organized UI design system makes everything so much trackable and consistent, still learning more about this but has been a real game changer
- Keeping things simple, from UI to code structure to literally everything is key to making nice UIs and softwares. I think finding the perfect balance of simplicity and complexity is the way to go, although sometimes it is very hard.

## Challenges

- **Using a good design system:** I was so caught up in trying to find the right spectrum of colors, creating every single variant of buttons and combine them will every color that it was a bit overwhelming. I plan to find better ways to go about this process and preferably move it to the beginning of the website building process. I found out about design systems mid way through.
- **Naming Conventions:** When writing new code and I am in the groove I find myself just throwing out whatever naming convention sounds best at the time for that said thing but when I come back to the same piece of code I wonder what was going through my mind to give this variable or classname or ID such a unfitting name. I honestly believe there is a hidden are to naming convention and will definitely be spending time improving in this field.
- **Underestimating Time Frames:** There would be times when I think of a feature I want to implement and I give myself a time frame of implementing it but I greatly underestimate how long it would take. This would throw off my plan for the week, constantly pushing back other features I wanted to implement. In order to fix this I began overestimating the time I would need. This is definitely something I should have been doing since the start of the project.

## Plan to Add / Fix:

- Make search queries happen on character change (mind page)
- Disable buttons when and where they should be
- Incorporate box shadows more
- Past months should already have all their events open for display, no need to click a button to show past events
- Fix dollar input amounts (bank page)
- Add red dots on events that are on the current day
- Fix amounts in bank page (.toFixed(2))
- Faster update times on tree changes (mind page)
- Add pagination on tree searches and sections
- Fix new tree creation error when already on a tree page
- Remove tag edit button and just leave it open to always be able to change
- Move star favorite button in tree page to somewhere where the UI would be nicer
