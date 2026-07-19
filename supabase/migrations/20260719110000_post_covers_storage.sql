-- Public bucket for blog post cover images

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-covers',
  'post-covers',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public can view post covers"
  on storage.objects
  for select
  to public
  using (bucket_id = 'post-covers');

create policy "Authenticated users can upload post covers"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'post-covers');

create policy "Authenticated users can update post covers"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'post-covers')
  with check (bucket_id = 'post-covers');

create policy "Authenticated users can delete post covers"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'post-covers');
