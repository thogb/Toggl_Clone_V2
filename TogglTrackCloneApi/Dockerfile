FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["./TogglTrackCloneApi/TogglTrackCloneApi.csproj", "TogglTrackCloneApi/"]
RUN dotnet restore "./TogglTrackCloneApi/TogglTrackCloneApi.csproj"
COPY . .
WORKDIR "/src/TogglTrackCloneApi"
RUN dotnet build "TogglTrackCloneApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TogglTrackCloneApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TogglTrackCloneApi.dll", "--urls", "http://0.0.0.0:8080"]