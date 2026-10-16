import importlib.util
import tempfile
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location("assets", Path(__file__).with_name("verify-static-assets.py"))
assets = importlib.util.module_from_spec(spec)
spec.loader.exec_module(assets)


class StaticAssetsTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)

    def test_responsive_images_and_video_poster(self):
        refs = assets.references('<video src="/official/videos/a.mp4" poster="/official/images/poster.webp"></video><source srcset="/official/images/a.webp 480w, /official/images/b.webp 960w">')
        self.assertEqual(len(refs), 4)

    def test_no_escape_or_unprefixed_assets(self):
        for url in ('/images/a.webp', '/official/%2e%2e/secret'):
            with self.assertRaises(ValueError):
                assets.local_target(self.root, url)

    def test_complete_public_files_including_runtime_media(self):
        out, public = self.root / 'out', self.root / 'public'
        out.mkdir()
        public.mkdir()
        (public / 'runtime.mp4').write_bytes(b'media')
        _, errors = assets.local_check(out, public)
        self.assertTrue(any('runtime.mp4' in error for error in errors))
        (out / 'runtime.mp4').write_bytes(b'other')
        _, errors = assets.local_check(out, public)
        self.assertTrue(any('runtime.mp4' in error for error in errors))

    def test_css_reference_missing_detected(self):
        (self.root / 'main.css').write_text('a{background:url(/official/images/missing.webp)}')
        _, errors = assets.local_check(self.root)
        self.assertTrue(any('missing.webp' in error for error in errors))

    def test_hash_changes_even_with_same_length(self):
        file = self.root / 'film.mp4'
        file.write_bytes(b'one')
        before = assets.inventory(self.root)
        file.write_bytes(b'two')
        self.assertNotEqual(before, assets.inventory(self.root))

    def test_agent_proxy_entry_is_not_required_in_static_export(self):
        (self.root / 'index.html').write_text('<a href="/official/md-agent/">Agent</a>')
        _, errors = assets.local_check(self.root)
        self.assertFalse(any('Missing reference' in error for error in errors))

    def test_agent_proxy_exception_does_not_hide_missing_assets(self):
        (self.root / 'index.html').write_text('<script src="/official/md-agent/assets/missing.js"></script><a href="/official/md-agent-missing/">Missing</a>')
        _, errors = assets.local_check(self.root)
        self.assertTrue(any('assets/missing.js' in error for error in errors))
        self.assertTrue(any('md-agent-missing' in error for error in errors))

    def test_svg_filter_inside_data_url_is_not_a_file(self):
        refs = assets.references('a{background:url("data:image/svg+xml,<svg filter=\'url(%23n)\'/>")}', False)
        self.assertEqual(len(refs), 1)
        self.assertTrue(next(iter(refs)).startswith('data:'))


if __name__ == '__main__':
    unittest.main()
