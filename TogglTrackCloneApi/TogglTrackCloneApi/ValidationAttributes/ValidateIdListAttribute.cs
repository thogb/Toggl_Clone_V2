using System.ComponentModel.DataAnnotations;

namespace TogglTrackCloneApi.ValidationAttributes
{
    public class ValidateIdListAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value == null) return true;
            var strs = value as IEnumerable<string>;
            if (strs == null) return false;
            foreach(string tagName in strs)
            {
                if (tagName == string.Empty) return false;
            }
            return true;
        }
    }
}
