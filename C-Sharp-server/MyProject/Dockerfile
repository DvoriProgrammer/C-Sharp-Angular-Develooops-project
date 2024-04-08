<<<<<<< HEAD
#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MyProject/MyProject.csproj", "MyProject/"]
COPY ["Common/Common.csproj", "Common/"]
COPY ["Repository/Repository.csproj", "Repository/"]
COPY ["DataContext/DataContext.csproj", "DataContext/"]
COPY ["Service/Service.csproj", "Service/"]
RUN dotnet restore "MyProject/MyProject.csproj"
COPY . .
WORKDIR "/src/MyProject"
RUN dotnet build "MyProject.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyProject.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
=======
#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MyProject/MyProject.csproj", "MyProject/"]
COPY ["Common/Common.csproj", "Common/"]
COPY ["Repository/Repository.csproj", "Repository/"]
COPY ["DataContext/DataContext.csproj", "DataContext/"]
COPY ["Service/Service.csproj", "Service/"]
RUN dotnet restore "MyProject/MyProject.csproj"
COPY . .
WORKDIR "/src/MyProject"
RUN dotnet build "MyProject.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyProject.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
>>>>>>> 563f1094ea4304d2aca30f36ad3ae9144dd4a33b
ENTRYPOINT ["dotnet", "MyProject.dll"]