using System.Security.Claims;
using TogglTrackCloneApi.Exceptions;
using TogglTrackCloneApi.Models;

namespace TogglTrackCloneApi.Helper
{
    public class ControllerHelper
    {
        public static int GetUserId(ClaimsPrincipal user)
        {
            if (!Int32.TryParse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value, out int userId))
                throw new APIException("Invalid NameIdentifier in request header");
            return userId;
        }
    }
}
