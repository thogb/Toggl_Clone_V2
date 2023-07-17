namespace TogglTrackCloneApi.Exceptions
{
    public class TTNoPermissionException : APIException
    {
        public TTNoPermissionException(string message) : base(StatusCodes.Status401Unauthorized, message)
        {
            
        }
    }
}
