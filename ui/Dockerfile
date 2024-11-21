# Step 1: Use the official Node.js image as the base
FROM node:20 AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the Next.js application
RUN npm run build

# Step 7: Use a lightweight Node.js image for production
FROM node:20-slim AS runner

# Step 8: Set the working directory inside the container
WORKDIR /app

# Step 9: Copy necessary files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Step 10: Expose the desired port (default for Next.js is 3000)
EXPOSE 3000

# Step 11: Start the Next.js server
CMD ["npm", "run", "start"]