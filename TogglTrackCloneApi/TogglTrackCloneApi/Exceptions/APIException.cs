namespace TogglTrackCloneApi.Exceptions
{
    public class APIException : Exception
    {
        public int StatusCode { get; set; } = StatusCodes.Status500InternalServerError;
        public APIException(string message) : base(message)
        {
        }

        public APIException(int inStatusCode, string message) : base(message)
        {
            StatusCode = inStatusCode;
        }
    }
}
