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

        public static List<int> TryParseStrIds(string strIds)
        {
            List<int> intIds;
            string[] splits = strIds.Split(',');

            try
            {
                intIds = splits.Select(s => Int32.Parse(s)).ToList();
                foreach (int id in intIds)
                {
                    if (id < 0) return new List<int>();
                }
            } catch
            {
                intIds = new List<int>();
            }

            return intIds;
        }
    }
}
