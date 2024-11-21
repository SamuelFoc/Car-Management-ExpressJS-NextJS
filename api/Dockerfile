# Step 1: Use the official Node.js image as the base
FROM node:20 AS base

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Step 4: Install production dependencies
RUN npm install --only=production

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source 

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the desired port (default for Express.js is 3000)
EXPOSE 3000

# Step 7: Start the Express server
CMD ["npm", "start"]
