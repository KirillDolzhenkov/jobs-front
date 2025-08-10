export const formatSalary = (min?: number, max?: number): string | null => {
  if (!min && !max) {
    return null;
  }
  if (min && max) {
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  }
  if (min) {
    return `From $${min.toLocaleString()}`;
  }
  if (max) {
    return `Up to $${max.toLocaleString()}`;
  }
  return null;
};

export const formatDate = (dateString: string): string => {
  const now      = new Date();
  const postDate = new Date(dateString);
  const diffTime = now.getTime() - postDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }
  if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  }
  return postDate.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day:   'numeric',
    },
  );
};

export const getDaysUntilExpiration = (expireAt: string): number => {
  const today          = new Date();
  const expirationDate = new Date(expireAt);
  const diffTime       = expirationDate.getTime() - today.getTime();
  const diffDays       = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const getExpirationChipColor = (expireAt: string): 'error' | 'warning' | 'info' | 'success' => {
  const days = getDaysUntilExpiration(expireAt);
  if (days <= 0) {
    return 'error';
  }
  if (days <= 7) {
    return 'warning';
  }
  if (days <= 30) {
    return 'info';
  }
  return 'success';
};