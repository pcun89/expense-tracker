# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source code
COPY . ./

# Publish the app for release
RUN dotnet publish -c Release -o /app/publish

# Use the official .NET runtime image for running
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

# Set environment variable for SQLite file location
ENV DOTNET_RUNNING_IN_CONTAINER=true
ENV DOTNET_USE_POLLING_FILE_WATCHER=1

# Expose default Cloud Run port
ENV PORT 8080
EXPOSE 8080

# Run the app
ENTRYPOINT ["dotnet", "ExpenseTrackerApi.dll"]