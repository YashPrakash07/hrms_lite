import { calculateAttendancePercentage, getInitials, formatDate } from './utils';

describe('HRMS Utility Functions', () => {
  
  describe('calculateAttendancePercentage', () => {
    it('should return 0 when total is 0', () => {
      expect(calculateAttendancePercentage(10, 0)).toBe(0);
    });

    it('should calculate the correct percentage', () => {
      expect(calculateAttendancePercentage(5, 10)).toBe(50);
      expect(calculateAttendancePercentage(1, 3)).toBe(33);
    });

    it('should handle zero present cases', () => {
      expect(calculateAttendancePercentage(0, 5)).toBe(0);
    });
  });

  describe('getInitials', () => {
    it('should return initials correctly', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Yash Prakash')).toBe('YP');
    });

    it('should handle single name', () => {
      expect(getInitials('Admin')).toBe('A');
    });

    it('should handle empty string', () => {
      expect(getInitials('')).toBe('');
    });
  });

  describe('formatDate', () => {
    it('should format date string correctly', () => {
      // Testing with a specific date to ensure consistency
      const date = '2026-02-02';
      const formatted = formatDate(date);
      expect(formatted).toContain('Feb 2');
      expect(formatted).toContain('2026');
    });
  });
});
