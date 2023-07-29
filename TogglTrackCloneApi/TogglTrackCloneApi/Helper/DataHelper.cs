﻿using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Data;

namespace TogglTrackCloneApi.Helper
{
    public class DataHelper
    {
        public static async Task ManageDataAsync(IServiceProvider svcProvider)
        {
            //Service: An instance of db context
            var dbContextSvc = svcProvider.GetRequiredService<TTCloneContext>();

            //Migration: This is the programmatic equivalent to Update-Database
            await dbContextSvc.Database.MigrateAsync();
        }
    }
}
