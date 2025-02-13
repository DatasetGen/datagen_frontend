# Step 1: Use an official Node.js image as a base
FROM node:18 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Step 4: Install dependencies (both regular and dev dependencies)
RUN npm install --legacy-peer-deps

# Step 5: Copy the rest of the application code
COPY . .


# Step 7: Expose the port your app will be running on
EXPOSE 3000

RUN npm run build

# Step 8: Use Vite to preview the app in production mode
CMD ["npm", "run", "preview", "--", "--host"]
