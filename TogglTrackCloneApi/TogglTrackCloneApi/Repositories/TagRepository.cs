﻿using Microsoft.EntityFrameworkCore;
using TogglTrackCloneApi.Data;
using TogglTrackCloneApi.DTOs.Tag;
using TogglTrackCloneApi.Models;
using TogglTrackCloneApi.Repositories.IRepositories;

namespace TogglTrackCloneApi.Repositories
{
    public class TagRepository : GenericWithIdRepository<Tag>, ITagRepository
    {
        public TagRepository(TTCloneContext context) : base(context)
        {
        }

        public async Task<bool> IsTagInWorkSpace(int tagId, int workspaceId)
        {
            return await _context.Tags.AnyAsync(t => t.Id == tagId && t.WorkspaceId == workspaceId);
        }

        public async Task<bool> IsTagNameInWorkSpace(string tagName, int workspaceId)
        {
            return await _context.Tags.AnyAsync(t => t.Name == tagName && t.WorkspaceId == workspaceId);
        }

        public override void Update(Tag entity)
        {
            base.Update(entity);
            _context.Entry(entity).Property(t => t.WorkspaceId).IsModified = false;
            _context.Entry(entity).Property(t => t.UserId).IsModified = false;
        }
    }
}
