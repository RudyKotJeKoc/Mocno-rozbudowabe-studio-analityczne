import { describe, it, expect, vi, afterEach } from 'vitest';
import {
  isRecord,
  isTrackCandidate,
  toTrack,
  loadPlaylist,
} from '../lib/playlist-parsers';

describe('isRecord', () => {
  it('should return true for objects', () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord({ a: 1 })).toBe(true);
  });

  it('should return false for non-objects', () => {
    expect(isRecord(null)).toBe(false);
    expect(isRecord(undefined)).toBe(false);
    expect(isRecord('string')).toBe(false);
    expect(isRecord(123)).toBe(false);
    expect(isRecord(true)).toBe(false);
    expect(isRecord([])).toBe(true); // Arrays are objects
  });
});

describe('isTrackCandidate', () => {
  it('should return true for objects with a path property', () => {
    expect(isTrackCandidate({ path: 'a' })).toBe(true);
  });

  it('should return false for objects without a path property', () => {
    expect(isTrackCandidate({ title: 'a' })).toBe(false);
    expect(isTrackCandidate({})).toBe(false);
  });

  it('should return false for non-objects', () => {
    expect(isTrackCandidate(null)).toBe(false);
    expect(isTrackCandidate('string')).toBe(false);
  });
});

describe('toTrack', () => {
  it('should convert a string to a track object', () => {
    expect(toTrack('path/to/track.mp3')).toEqual({
      path: 'path/to/track.mp3',
    });
  });

  it('should convert a valid track candidate object to a track object', () => {
    const candidate = { path: 'path/to/track.mp3', title: 'My Track', id: '123' };
    expect(toTrack(candidate)).toEqual({
      path: 'path/to/track.mp3',
      title: 'My Track',
      id: '123',
    });
  });

  it('should handle partial track candidate objects', () => {
    expect(toTrack({ path: 'path/to/track.mp3', title: 'My Track' })).toEqual({
      path: 'path/to/track.mp3',
      title: 'My Track',
    });
    expect(toTrack({ path: 'path/to/track.mp3' })).toEqual({
      path: 'path/to/track.mp3',
    });
  });

  it('should return null for invalid inputs', () => {
    expect(toTrack(null)).toBeNull();
    expect(toTrack(undefined)).toBeNull();
    expect(toTrack(123)).toBeNull();
    expect(toTrack({})).toBeNull();
    expect(toTrack({ title: 'only title' })).toBeNull();
    expect(toTrack({ path: 123 })).toBeNull(); // path must be a string
  });
});

describe('loadPlaylist', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should load a playlist from an array of strings', async () => {
    const mockData = ['track1.mp3', 'track2.mp3'];
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const playlist = await loadPlaylist();
    expect(playlist).toEqual([{ path: 'track1.mp3' }, { path: 'track2.mp3' }]);
    expect(fetchSpy).toHaveBeenCalledWith('/audio/playlist.json', { cache: 'no-cache' });
  });

  it('should load a playlist from an object with a tracks property', async () => {
    const mockData = {
      tracks: [{ path: 'track1.mp3', title: 'Track 1' }],
    };
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const playlist = await loadPlaylist();
    expect(playlist).toEqual([{ path: 'track1.mp3', title: 'Track 1' }]);
    expect(fetchSpy).toHaveBeenCalledWith('/audio/playlist.json', { cache: 'no-cache' });
  });

  it('should try the second URL if the first one fails', async () => {
    const mockData = ['track1.mp3'];
    const fetchSpy = vi.spyOn(global, 'fetch');
    fetchSpy.mockResolvedValueOnce({ ok: false } as Response);
    fetchSpy.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response);

    const playlist = await loadPlaylist();
    expect(playlist).toEqual([{ path: 'track1.mp3' }]);
    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(fetchSpy).toHaveBeenCalledWith('/audio/playlist.json', { cache: 'no-cache' });
    expect(fetchSpy).toHaveBeenCalledWith('/workspace/uploads/playlist.json', { cache: 'no-cache' });
  });

  it('should return an empty array if all URLs fail', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({ ok: false } as Response);
    const playlist = await loadPlaylist();
    expect(playlist).toEqual([]);
  });

  it('should return an empty array if fetch throws an error', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));
    const playlist = await loadPlaylist();
    expect(playlist).toEqual([]);
  });

  it('should return an empty array for invalid data', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}), // missing 'tracks' property
    } as Response);
    const playlist = await loadPlaylist();
    expect(playlist).toEqual([]);
  });
});
