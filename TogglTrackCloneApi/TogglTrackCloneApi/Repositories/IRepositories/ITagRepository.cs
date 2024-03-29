﻿using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Repositories.IRepositories
{
    public interface ITagRepository : IGenericWIthIDRepository<Tag>
    {
        Task<bool> IsTagInWorkSpace(int tagId, int workspaceId);
        Task<bool> IsTagNameInWorkSpace(string tagName, int workspaceId);
    }
}
