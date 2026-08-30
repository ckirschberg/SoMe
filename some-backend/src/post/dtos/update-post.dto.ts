import { CreatePostDto } from './create-post.dto';

// An update sends the same fields as a create, so inherit them rather than
// repeating the list in two places. It stays its own type because the two
// drift apart as soon as one field is create-only (a slug you set once) or
// update-only (an edit reason) - and then only this line has to change.
export class UpdatePostDto extends CreatePostDto {}
